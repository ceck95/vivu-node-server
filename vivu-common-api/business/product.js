class ProductBusiness {

  static sort(src, search) {

    let searchArrayWord = JSON.parse(`["${search.split(' ').join('","')}"]`).filter((v, i, a) => a.indexOf(v) === i),
      getCountWord = (product) => {
        let countWord = (key) => {
          let count = 0;
          JSON.parse(product[key]).forEach(e => {
            searchArrayWord.forEach(a => {
              if (e === a) {
                count++;
              }
            });
          });
          return count;
        };
        let countSearch = countWord('search'),
          countSearchFull = countWord('searchFull');
        if (countSearch >= countSearchFull) {
          return countSearch;
        }
        return countSearchFull;
      };

    return src.sort((a, b) => {
      let countA = getCountWord(a),
        countB = getCountWord(b);
      if (countA > countB) {
        return -1;
      } else {
        return 1;
      }
    });

  }

  static sortFlowPrice(src) {
    return src.sort((a, b) => {
      return a.basePrice - b.basePrice;
    });
  }

  static replyListProduct(request, products, productSchema, productColorSchema) {
    let productStore = request.dataStore.getStore('Product'),
      productColorStore = request.dataStore.getStore('ProductColor'),
      results = [];

    products.forEach(e => {
      e.forEach(i => {

        let item = productStore.createModel(i).responseObject({
          schema: productSchema.response
        });

        if (i.productColor.id) {
          item.productColor = productColorStore.createModel(i.productColor).responseObject({
            schema: productColorSchema.responseOne
          });
        }
        item.categoryGroupId = i.categoryGroup.id;
        results.push(item);

      });
    });
    return results;
  }

}
module.exports = ProductBusiness;