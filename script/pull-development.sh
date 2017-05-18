# @Author: Tran Van Nhut <nhutdev>
# @Date:   2017-02-20T20:21:47+07:00
# @Email:  tranvannhut4495@gmail.com
# @Last modified by:   nhutdev
# @Last modified time: 2017-02-23T12:17:39+07:00


DIR="/home/nhutdev/my-project/luan-an/vivu"
cd $DIR/vivu-api
npm update
cd $DIR/vivu-common-api
npm update
cd $DIR/vivu-data-access
npm update
cd $DIR/vivu-data-access-thrift
sh gen.sh
cd ..
sh init.sh
