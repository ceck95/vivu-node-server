/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:43:38+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T13:22:46+07:00
 */

'use strict';

const helpers = require('node-helpers');
const Controller = require('node-hapi').Controller;
const rp = require('request-promise');
const cheerio = require('cheerio');
const BPromise = require('bluebird');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

class TestController extends Controller {

  test(request, reply) {
    const form = request.payload.data,
      limit = 120,
      countTotal = 32,
      apiInsert = 'http://frontend.vivu.dev/quote-item/create',
      funcGetListInsert = () => {
        return new BPromise((resolve, reject) => {
          return rp({
            uri: `${form.link}?page=1`,
            method: 'GET'
          }).then(result => {
            const $ = cheerio.load(result),
              limitCurrent = parseInt($('.filter-list-box h4').text());
            let listInsert = [],
              funcInsertList = (body) => {
                const $ = cheerio.load(body);
                $('.product-box-list div').each(function(i, elem) {
                  let linkCurrent = $(this).find('a').attr('href'),
                    linkImage = $(this).find('.product-image').attr('src');
                  if (linkCurrent)
                    listInsert.push({
                      link: linkCurrent,
                      linkImage: linkImage
                    });
                });
              };

            funcInsertList(result);

            if (limitCurrent <= limit) {
              return resolve(listInsert);
            }

            let totalPage = Math.floor(limit / countTotal) + 1,
              totalPageCurrent = Math.floor(limitCurrent / countTotal) + 1,
              totalPageNeedRequest = totalPage,
              listPromise = [];
            if (totalPageCurrent < totalPage) {
              totalPageNeedRequest = totalPageCurrent;
            }

            for (let i = 2; i < totalPageNeedRequest; i++) {
              listPromise.push(rp({
                uri: `${form.link}?page=${i}`,
                method: 'GET'
              }));
            }

            return BPromise.all(listPromise).then(results => {

              results.forEach(e => {
                funcInsertList(e);
              });

              return resolve(listInsert);

            }).catch(err => {
              return reject(err);
            });

          }).catch(err => {
            return reject(err);
          });

        });
      };
    return funcGetListInsert().then(listInsert => {
      const distCurrent = '/home/nhutdev/Desktop/image-raw',
        directoryRaw = path.basename(form.link),
        downloadImage = (item) => {
          return new BPromise((resolve, reject) => {
            const fileName = path.basename(item.linkImage),
              file = `${distCurrent}/${directoryRaw}/${fileName}`,
              stream = rp(item.linkImage).pipe(fs.createWriteStream(file));
            return stream.on('finish', () => {
              return resolve({
                file: file
              });
            });
          });
        },
        insertOne = (item, i) => {
          return new BPromise((resolve, reject) => {

            const slugFunc = (slug) => {
              slug = slug.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, (x, y) => {
                return x.replace(x, '-');
              }).replace(/ /g, (x, y) => {
                return x.replace(x, '-');
              }).toLowerCase();

              slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
              slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
              slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
              slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
              slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
              slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
              slug = slug.replace(/đ/gi, 'd');

              slug = slug.replace(/-{2,}/g, (x, y) => {
                return x.replace(x, '-');
              });
              return slug;
            };

            return downloadImage(item).then(file => {
              return rp({
                method: 'GET',
                uri: item.link
              }).then(detail => {
                const $ = cheerio.load(detail);
                const price = parseInt($('#span-price').text().split('.').join('')),
                  sku = $('#product-sku p').text().trim(),
                  productName = $('#product-name').text().trim(),
                  detailProduct = $('.product-content-detail #gioi-thieu').html();

                const req = rp.post(apiInsert, {
                  formData: {
                    'Product[category_id]': form.categoryId,
                    'Product[name]': productName,
                    'Product[url_key]': slugFunc(productName),
                    'Product[sku]': sku,
                    'Product[details]': detailProduct,
                    'Product[base_price]': price,
                    'Product[notes]': '',
                    'Product[is_sold_out]': 0,
                    'Product[status]': 1,
                    'Product[image_path]': fs.createReadStream(file.file)
                  }
                });

                return req.then(result => {
                  result = JSON.parse(result);
                  if (result.insert) {
                    console.log(`STT ${i} Insert successfully produc name: ${productName}`);
                  } else {
                    console.log(`Insert fail error message: ${result.insert}`);
                  }

                  return resolve(result);

                }).catch(err => {
                  return reject(err);
                });

              }).then(err => {
                return reject(err);
              });


            }).catch(err => {
              return reject(err);
            });

          });
        };
      if (!fs.existsSync(`${distCurrent}/${directoryRaw}`)) {
        fs.mkdirSync(`${distCurrent}/${directoryRaw}`);
      }
      let listPromiseInsert = [];
      listInsert.forEach((e, i) => {
        listPromiseInsert.push(insertOne(e, i));
      });
      return BPromise.all(listPromiseInsert).then(result => {

        let responseObject = helpers.Json.response(request, {});
        return reply(responseObject);

      }).catch(err => {
        return helpers.HAPI.replyError(request, reply, err, {});
      });
    }).catch(err => {
      return helpers.HAPI.replyError(request, reply, err, {});
    });

  }

}

module.exports = TestController;