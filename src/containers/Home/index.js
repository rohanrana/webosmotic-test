import React, { Component } from "react";
import {
  UserOutlined,
  PhoneOutlined, ExclamationCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import TextInput from "../../components/InputComponent/TextInput";
import { ValidateInput } from "./Validate";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUserData, updateUserData, getAllUserData, deleteUser } from "../../redux/actions";
import { uniqueId } from "lodash";
import OpenNotification from "../../components/OpenNotification";
import { Radio, Table, Tag, Modal, Select } from "antd"
import DatePicker from "react-datepicker"
import moment from "moment"
const { confirm } = Modal
const { Option } = Select
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      gender: "",
      dob: null,
      phone: "",
      email: "",
      hobbies: [],
      edit_id: null,
      errors: ""
    };
  }
  componentDidMount() {
    this.props.onFetchUsers()
  }
  handleChange = e => {
    let errors = null;
    let name = e.target.name;
    let value = e.target.value;
    if (this.state.errors) {
      errors = Object.assign("", this.state.errors);
      delete errors[e.target.name];
    }
    this.setState({ [e.target.name]: e.target.value, errors: errors }, () => {
      if (this.state[name] !== "") {
        let data = {
          [name]: value
        };
        const errors = ValidateInput(data);
        if (!errors.isValid) {
          this.setState({ errors: errors.errors });
        }
      }
    });
  };
  handleCheckBox = (values) => {
    let errors = null;
    if (this.state.errors) {
      errors = Object.assign("", this.state.errors);
      delete errors["hobbies"];
    }
    this.setState({ hobbies: values, errors: errors })
  }
  handleDropDown = (values) => {
    let errors = null;
    if (this.state.errors) {
      errors = Object.assign("", this.state.errors);
      delete errors["hobbies"];
    }
    this.setState({ hobbies: values, errors: errors })
  }
  handleDateChange = (date, key) => {
    if (date) {
      let errors = null;
      if (this.state.errors) {
        errors = Object.assign("", this.state.errors);
        delete errors["dob"];
      }
      this.setState(
        {
          dob: date ? moment(date).format("YYYY-MM-DD") : null, errors: errors
        },
      );
    } else {
      this.setState({ dob: null })
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let data = {
      user_name: this.state.user_name,
      dob: this.state.dob,
      gender: this.state.gender,
      hobbies: this.state.hobbies,
      email: this.state.email,
      phone: this.state.phone
    };
    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      if (this.state.edit_id) {
        let users = JSON.parse(localStorage.getItem("WS-ALL-USERS"));
        if (users) {
          let foundUser = users.find(
            d => d._id === this.state.edit_id
          );
          if (foundUser) {
            foundUser.user_name = this.state.user_name;
            foundUser.dob = this.state.dob;
            foundUser.gender = this.state.gender;
            foundUser.hobbies = this.state.hobbies;
            foundUser.email = this.state.email;
            foundUser.phone = this.state.phone;

            console.log("UPDATED USERS", users)
            this.props.onUpdateUser(users)
            this.clearData()
            this.props.onFetchUsers()
          }
        } else {
          let payload1 = {
            _id: uniqueId("WS_"),
            user_name: this.state.user_name,
            dob: this.state.dob,
            gender: this.state.gender,
            hobbies: this.state.hobbies,
            email: this.state.email,
            phone: this.state.phone
          };
          this.props.onAddUser([payload1])
          this.clearData()
        }
      } else {
        let users = JSON.parse(localStorage.getItem("WS-ALL-USERS"));
        if (users) {
          let foundUser = users.find(
            d => d.user_name === data.user_name || d.email === data.email
          );
          if (foundUser) {
            OpenNotification({
              title: "Email or Username is already used",
              type: "error"
            });

          } else {
            let payload = {
              _id: uniqueId("WS_"),
              user_name: this.state.user_name,
              dob: this.state.dob,
              gender: this.state.gender,
              hobbies: this.state.hobbies,
              email: this.state.email,
              phone: this.state.phone
            };
            // users.push(payload);
            this.props.onAddUser(payload)
            this.clearData()


          }
        } else {
          let payload1 = {
            _id: uniqueId("WS_"),
            user_name: this.state.user_name,
            dob: this.state.dob,
            gender: this.state.gender,
            hobbies: this.state.hobbies,
            email: this.state.email,
            phone: this.state.phone
          };

          this.props.onAddUser(payload1)
          this.clearData()
          // localStorage.setItem("WS-ALL-USERS", JSON.stringify(user));
        }
      }

    }
  };
  handleEdit = (record) => {
    this.setState({
      edit_id: record._id,
      user_name: record.user_name,
      gender: record.gender,
      dob: record.dob,
      phone: record.phone,
      email: record.email,
      hobbies: record.hobbies,
      errors: null
    })
  }
  handleDelete = (record) => {
    this.clearData()
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure want to delete this user ?",
      onOk: () => {
        this.props.onDeleteUser(record._id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  clearData = () => {
    this.setState({
      user_name: "",
      gender: "",
      dob: null,
      phone: "",
      email: "",
      hobbies: [],
      errors: "",
      edit_id: null
    })
  }
  render() {
    let { errors, user_name, phone, email } = this.state;
    let { users } = this.props.users
    console.log("USERS", this.props.users)

    const columns = [
      {
        title: 'Name',
        dataIndex: 'user_name',
        key: 'user_name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      }, {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Hobbies',
        dataIndex: 'hobbies',
        key: 'hobbies',
        render: (hobbies) => <span>{hobbies.toString()}</span>
      },
      {
        title: 'DOB',
        dataIndex: 'dob',
        key: 'dob',
        render: (dob) => <span>{moment(dob).format("Do-MMM-YYYY")}</span>

      },
      {
        title: 'Action',
        dataIndex: 'address',
        key: 'address',
        render: (text, record) => {
          return <div><Tag onClick={() => this.handleEdit(record)} color="green" >Edit</Tag><Tag onClick={() => this.handleDelete(record)} color="red" >Delete</Tag></div>
        }
      }



    ];

    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-wrapper">
          <div>
            {/* --- INPUTS USED HERE ARE REUSABLE COMPONENT--- */}
            <TextInput
              placeholder="Username"
              name={"user_name"}
              value={user_name}
              className="lgn-input-field"
              prefix={<UserOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.user_name}
                className="validation-error"
              />
            )}
            <br />
            <div className="radio-btn-wrapper" >
              <label className="gender-lbl">Gender : </label>
              <Radio.Group value={this.state.gender} name="gender" style={{ marginTop: 20 }} className="lgn-input-field" onChange={this.handleChange} defaultValue="a">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
              </Radio.Group>

            </div>
            {errors && (
              <ValidationErrorComponent
                message={errors.gender}
                className="validation-error"
              />
            )}

            <br />
            <DatePicker
              showYearDropdown
              showMonthDropdown
              todayButton="Today"
              dateFormat="dd/MM/yyyy"
              isClearable={true}
              placeholderText={`Select DOB`}
              className="ant-input ant-input-lg custom-date-input"
              maxDate={new Date("01/01/2001")}

              selected={
                this.state.dob ? new Date(this.state.dob) : null
              }
              onChange={(date) => {
                this.handleDateChange(date)
              }
              }
            />
            {/* <DatePicker value={this.state.dob} style={{ marginTop: 20, width: "100%" }} className="lgn-input-field" placeholder="Select Date of birth" onChange={this.handleDateChange} /> */}
            {errors && (
              <ValidationErrorComponent
                message={errors.dob}
                className="validation-error"
              />
            )}

            <TextInput
              placeholder="Email"
              name={"email"}
              value={email}
              className="lgn-input-field"
              prefix={<MailOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.email}
                className="validation-error"
              />
            )}
            <TextInput
              placeholder="Phone"
              name={"phone"}
              value={phone}
              className="lgn-input-field"
              prefix={<PhoneOutlined />}
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.phone}
                className="validation-error"
              />
            )}
            {/* <Checkbox.Group style={{ marginTop: 20 }} value={this.state.hobbies} onChange={this.handleCheckBox}>
              <Row>
                <Col span={8}>
                  <Checkbox value="singing">Singing</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="dancing">Dancing</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="writing">Writing</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="travelling">Travelling</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group> */}
            <Select
              mode="multiple"
              style={{ width: '100%', height: 40, marginTop: 20 }}
              placeholder="Select Hobbies"
              // defaultValue={['china']}
              value={this.state.hobbies}
              onChange={this.handleDropDown}
              optionLabelProp="label"
            >
              <Option value="singing" label="Singing">
                Singing
              </Option>
              <Option value="dancing" label="Dancing">
                Dancing
              </Option>
              <Option value="traveling" label="Traveling">
                Traveling
              </Option>
            </Select>
            {errors && (
              <ValidationErrorComponent
                message={errors.hobbies}
                className="validation-error"
              />
            )}
          </div>
          <div className="login-btn-wrapper">
            <button
              className="btn-login"
              onClick={this.handleSubmit}
            >
              {this.state.edit_id ? "UPDATE" : "ADD"}
            </button>
          </div>
        </form>
        <div className="table-wrapper" >
          {<Table dataSource={users} columns={columns} pagination={false} />}

        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { users: state.users };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddUser: (data, props) => dispatch(addUserData(data, props)),
    onUpdateUser: (data, props) => dispatch(updateUserData(data, props)),
    onFetchUsers: (data, props) => dispatch(getAllUserData(data, props)),
    onDeleteUser: (data, props) => dispatch(deleteUser(data, props)),





  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
