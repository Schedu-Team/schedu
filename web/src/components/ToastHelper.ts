import { AxiosResponse } from "axios";

class ToastHelper {
  showError: boolean = false;
  showSuccess: boolean = false;
  errorContent: string = "";
  successContent: string = "";

  reset() {
    this.showSuccess = false;
    this.showError = false;
  }

  fail(message: string) {
    this.showSuccess = false;

    this.showError = true;
    this.errorContent = message;
  }

  succeed(message: string) {
    this.showError = false;

    this.showSuccess = true;
    this.successContent = message;
  }

  async takeoverPromise(promise: Promise<AxiosResponse>) {
    this.reset();
    const res = await promise.catch((e) => this.fail(e.toString()));
    if (res === undefined) {
      return;
    }
    console.log(res);
    if (res.status === 200) {
      this.succeed(
        "Successful insertion. Insertion info: " + JSON.stringify(res.data)
      );
    } else {
      this.fail("Error occurred: " + res.statusText);
    }
  }
}

export default ToastHelper;
