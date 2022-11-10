import { AxiosRequestConfig } from "axios";

class TokenHolder {
  private token?: string = undefined;

  getAuthOptions() {
    const ttoken = this.token;
    if (ttoken === undefined) return undefined;
    let res: AxiosRequestConfig = { headers: { Authorization: "Bearer " + ttoken } };
    return res;
  }

  setToken(token_?: string) {
    console.log("Token updated: " + token_);
    this.token = token_;
  }
}

const tokenHolder = new TokenHolder();

export default tokenHolder;
