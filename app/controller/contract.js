const Controller = require('egg').Controller;

class ContractController extends Controller {
  async getInfo() {
    const { ctx, service } = this;
    const res = await service.contract.genPdf();
    ctx.body = res;
    ctx.status = 200;
  }

  async getImg() {
    const { ctx, service } = this;
    const res = await service.contract.genImg();
    ctx.body = res;
    ctx.status = 200;
  }

  async mergeInfo() {
    const { ctx } = this;
    ctx.body = 'hi, merge info';
  }
}

module.exports = ContractController;
