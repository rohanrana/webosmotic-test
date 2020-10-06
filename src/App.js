import React from "react";
import { Layout } from "antd";

import "./App.css";
import { withRouter } from "react-router-dom";
const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Header style={{ justifyContent: !this.props.isAuthenticated ? "center" : "flex-start" }} className="header">
          <div onClick={() => this.props.history.push("/")} className="logo">
            <span>Webosmotic</span>
          </div>
        </Header>
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


export default (withRouter(App));
