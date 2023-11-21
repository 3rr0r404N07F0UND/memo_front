axios.default.withCredentials = true;
$.notify.defaults({
  globalPosition: "bottom right",
  clickToHide: true,
  autoHide: true,
  autoHideDelay: 10000
});
const {
  CookiesProvider,
  Cookies
} = ReactCookie;
const cookies = new Cookies();
const ip = "rabbiyfy.koreacentral.cloudapp.azure.com";
class MainClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkId: 0,
      id: ""
    };
  }
  componentDidMount() {
    document.getElementById("next-button").addEventListener("click", () => {});
  }
  render() {
    if (this.state.checkId === 0) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LoginSectionID, {
        mainObject: this
      }));
    } else if (this.state.checkId === 1) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LoginSectionPW, {
        mainObject: this
      }));
    } else {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Memo, null));
    }
  }
}
class LoginSectionID extends React.Component {
  constructor(props) {
    super(props);
    this.mainObject = props.mainObject;
    this.state = {
      innerId: "",
      checkId: true
    };
    this.regexCheckInput = this.regexCheckInput.bind(this);
  }
  regexCheckInput(e) {
    const changeStateResult = {
      ...this.state
    };
    changeStateResult.innerId = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    this.setState(changeStateResult);
  }
  componentDidMount() {
    $.notify("sample id is aaa", "success");
    document.getElementById("next-button").addEventListener("click", async () => {
      const apiResult = await axios.get(`http://${ip}:8000/user/id?id=${document.getElementById("login-username").value}`);
      console.log(apiResult.data);
      if (apiResult.data.result) {
        const remakeState = {
          ...this.mainObject.state
        };
        remakeState.checkId = 1;
        remakeState.id = document.getElementById("login-username").value;
        this.mainObject.setState(remakeState);
      } else {
        this.setState({
          ...this.state,
          checkId: false
        });
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("section", {
      className: "login-section"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "main-logo"
    }), /*#__PURE__*/React.createElement("h2", null, "LOGIN"), /*#__PURE__*/React.createElement("h3", null, "use nickname"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "login-username",
      className: "login-input",
      placeholder: "input id",
      pattern: "[a-zA-Z0-9]",
      onInput: this.regexCheckInput,
      value: this.state.innerId
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        display: this.state.checkId ? "none" : "block",
        color: "red",
        fontSize: 30 / 1920 * 100 + "vw",
        marginLeft: "30px"
      }
    }, "Check your id"), /*#__PURE__*/React.createElement("p", {
      className: "create-account"
    }, /*#__PURE__*/React.createElement("a", {
      href: `http://${ip}:8000/create/account`
    }, "Create account")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "next-button",
      className: "cur-pointer"
    }, "next"));
  }
}
class LoginSectionPW extends React.Component {
  constructor(props) {
    super(props);
    this.mainObject = props.mainObject;
    this.state = {
      checkPw: true
    };
  }
  componentDidMount() {
    $.notify("sample pw is aaa", "success");
    document.getElementById("login-button").addEventListener("click", async () => {
      const isRight = await axios.get(`http://${ip}:8000/user/pw/?id=${this.mainObject.state.id}&pw=${document.getElementById("login-pw").value}`, {
        withCredentials: true
      });
      if (isRight.data.result) {
        const tempState = {
          ...this.mainObject.state
        };
        tempState.checkId = 2;
        this.mainObject.setState(tempState);
      } else {
        this.setState({
          checkPw: false
        });
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("section", {
      className: "login-section"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "main-logo"
    }), /*#__PURE__*/React.createElement("h2", null, this.mainObject.state.id), /*#__PURE__*/React.createElement("h3", null, "\xA0"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      id: "login-pw",
      className: "login-input",
      placeholder: "input pw",
      pattern: "[a-zA-Z0-9]"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        display: this.state.checkPw ? "none" : "block",
        color: "red",
        fontSize: 30 / 1920 * 100 + "vw",
        marginLeft: "30px"
      }
    }, "Check your pw"), /*#__PURE__*/React.createElement("p", {
      className: "create-account"
    }, /*#__PURE__*/React.createElement("a", {
      href: `http://${ip}:8000/create/account`
    }, "Create account")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      id: "login-button",
      className: "cur-pointer"
    }, "login"));
  }
}
class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFile: true,
      nowFile: "",
      showList: "None",
      search: ""
    };
  }
  render() {
    return /*#__PURE__*/React.createElement("section", {
      className: "memo"
    }, /*#__PURE__*/React.createElement(SideBar, {
      memoObject: this
    }), /*#__PURE__*/React.createElement(MainContent, {
      memoObject: this
    }));
  }
}
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.memoObject = props.memoObject;
    this.newFile = this.newFile.bind(this);
    this.selectUpdates = this.selectUpdates.bind(this);
    this.searchInput = this.searchInput.bind(this);
  }
  newFile() {
    const temp = {
      ...this.memoObject.state
    };
    temp.newFile = true;
    temp.showList = "None";
    this.memoObject.setState(temp);
  }
  selectUpdates(callbackFunction) {
    const temp = {
      ...this.memoObject.state
    };
    temp.showList = "Updates";
    temp.newFile = false;
    this.memoObject.setState(temp, () => {
      if (callbackFunction) {
        callbackFunction();
      }
    });
  }
  searchInput(e) {
    console.log(e);
    this.memoObject.setState({
      ...this.memoObject.state,
      search: e.target.value
    }, () => {
      this.selectUpdates();
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("div", {
      className: "memo-logo cur-pointer",
      onClick: this.newFile
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "search-bar",
      placeholder: "Search",
      onInput: e => {
        this.searchInput(e);
      },
      value: this.memoObject.state.search
    }), /*#__PURE__*/React.createElement("div", {
      className: "option-div"
    }, /*#__PURE__*/React.createElement("p", {
      onClick: () => {
        this.selectUpdates(() => {
          this.memoObject.setState({
            ...this.memoObject.state,
            search: ""
          });
        });
      },
      className: "cur-pointer"
    }, "Updates"), /*#__PURE__*/React.createElement("p", null)), /*#__PURE__*/React.createElement("hr", null));
  }
}
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.memoObject = props.memoObject;
    this.newFile = this.newFile.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.defaultValueSet = this.defaultValueSet.bind(this);
    this.state = {
      made: false,
      no: null,
      title: "",
      text: "",
      saveAction: false,
      deleteAction: false
    };
  }
  newFile() {
    const temp = {
      ...this.memoObject.state
    };
    temp.newFile = false;
    this.memoObject.setState(temp);
    const localTemp = {
      ...this.state
    };
    localTemp.made = true;
    localTemp.no = null;
    localTemp.title = "";
    localTemp.text = "";
    this.setState(localTemp);
  }
  deleteFile() {
    if (this.state.no) {
      axios.get(`http://${ip}:8000/delete?no=${this.state.no}`);
      const temp = {
        ...this.state
      };
      temp.no = null;
      this.setState(temp);
      const outTemp = {
        ...this.memoObject.state
      };
      outTemp.newFile = true;
      this.memoObject.setState(outTemp);
    } else {
      const temp = {
        ...this.state
      };
      temp.no = null;
      this.setState(temp);
      const outTemp = {
        ...this.memoObject.state
      };
      outTemp.newFile = true;
      this.memoObject.setState(outTemp);
    }
    this.setState({
      ...this.state,
      deleteAction: true
    }, () => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          deleteAction: false
        });
      }, 300);
    });
    $.notify("deleted success", "error");
  }
  async defaultValueSet() {
    if (this.state.no) {
      console.log("im in");
      const resp = await axios.get(`http://${ip}:8000/pk/memo?pk=${this.state.no}`);
      const data = await resp.data;
      console.log(data);
      const temp = {
        ...this.state
      };
      temp.title = data.memo_title;
      temp.text = data.memo_text;
      console.log(temp);
      this.setState(temp, () => {
        document.getElementById("input-title").value = this.state.title;
        document.getElementById("input-textarea").value = this.state.text;
      });
    }
  }
  saveFile(e) {
    if (this.state.no) {
      axios.post(`http://${ip}:8000/mode/pk/`, {
        title: document.getElementById("input-title").value,
        text: document.getElementById("input-textarea").value,
        pk: this.state.no
      });
    } else {
      axios.post(`http://${ip}:8000/create/`, {
        title: document.getElementById("input-title").value,
        text: document.getElementById("input-textarea").value
      }, {
        withCredentials: true
      });
    }
    $.notify("saved success", "success");
    this.setState({
      ...this.state,
      saveAction: true
    }, () => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          saveAction: false
        });
      }, 300);
    });
  }
  render() {
    if (this.memoObject.state.newFile) {
      return /*#__PURE__*/React.createElement("section", {
        className: "content-section"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: this.newFile,
        className: "new-button cur-pointer"
      }, "Create File"));
    } else if (this.memoObject.state.showList === "Updates") {
      return /*#__PURE__*/React.createElement(MemoElement, {
        memoObject: this.memoObject,
        mainContent: this,
        hiddenVal: this.memoObject.state.search
      });
    } else if (this.state.made) {
      return /*#__PURE__*/React.createElement("section", {
        className: "content-section"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "input-title",
        className: "input-title",
        placeholder: "# input title"
      }), /*#__PURE__*/React.createElement("i", {
        className: `xi-trash icon-size80 ${this.state.deleteAction ? "sizeAction" : ""}`,
        onClick: this.deleteFile
      }), /*#__PURE__*/React.createElement("i", {
        className: `xi-save icon-size80 ${this.state.saveAction ? "sizeAction" : ""}`,
        onClick: this.saveFile
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "input-textarea",
        id: "input-textarea"
      }));
    }
  }
}
class MemoElement extends React.Component {
  constructor(props) {
    super(props);
    this.memoObject = this.props.memoObject;
    this.mainContent = this.props.mainContent;
    this.showList = this.showList.bind(this);
    this.state = {
      data: [],
      checkerSearch: this.memoObject.state.search
    };
    this.showList();
    this.modeMemo = this.modeMemo.bind(this);
  }
  async showList() {
    const resp = await axios.get(`http://${ip}:8000/shows/?search=${this.memoObject.state.search}`, {
      withCredentials: true
    });
    const data = await resp.data;
    const outputData = [];
    for (const v of JSON.parse(data)) {
      outputData.push(v.fields);
    }
    const temp = {
      ...this.state
    };
    temp.data = outputData;
    this.setState(temp);
  }
  componentDidUpdate() {
    if (this.state.checkerSearch !== this.memoObject.state.search) {
      this.showList();
      this.setState({
        ...this.state,
        checkerSearch: this.memoObject.state.search
      });
    }
  }
  async modeMemo(e) {
    const result = await axios(`http://${ip}:8000/get/memo?title=${encodeURIComponent(e.currentTarget.innerText)}`);
    const [data] = JSON.parse(result.data);
    const temp = {
      ...this.memoObject.state
    };
    temp.no = data.pk;
    temp.showList = "None";
    this.memoObject.setState(temp);
    const innerTemp = {
      ...this.mainContent.state
    };
    innerTemp.made = true;
    innerTemp.no = data.pk;
    this.mainContent.setState(innerTemp, () => {
      this.mainContent.defaultValueSet();
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "list-memo"
    }, this.state.data.map((v, i) => {
      console.log(v);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "memo-ele cur-pointer",
        text: this.props.hiddenVal
      }, /*#__PURE__*/React.createElement("p", {
        onClick: this.modeMemo
      }, v.memo_title));
    }));
  }
}
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalClose = this.modalClose.bind(this);
    this.state = {
      display: true,
      error: ""
    };
  }
  modalClose() {
    const temp = {
      ...this.state
    };
    temp.display = false;
  }
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, this.state.error), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: this.modalClose
    }, "Close"));
  }
}
ReactDOM.createRoot(document.getElementById("main-section")).render( /*#__PURE__*/React.createElement(CookiesProvider, null, /*#__PURE__*/React.createElement(MainClass, null)));