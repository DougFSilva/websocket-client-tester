export class MessageReceived {
  constructor(private readonly _header: any, private readonly _body: any){}

  get header() {
    return this._header;
  }

  get body() {
    return this._body;
  }
}
