import React, { Component } from 'react';
import {List,Layout,Spin,Form,message,Row,Col,Card,Drawer,Input,Button} from 'antd';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
class Comments extends Component {
  constructor(props){
    super(props)
    this.state= {
      visible: false,
      data: []
    }
    this.showDrawer = this.showDrawer.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  showDrawer(){
    this.setState({
      visible: true,
    });
    this.props.form.resetFields();
  }
  onClose(){
    this.setState(
      {
        visible: false,
      }
    );
  }
  componentWillMount(){
    if(!this.props.comments_success.status){
        this.props.commentsList();
    }else{
      this.setState({data: this.props.comments_success.data});
    }
  }
  componentWillReceiveProps(props){
    if(props.comments_success.status){
        this.setState({data: props.comments_success.data});
    }

  }
  componentDidUpdate(){
    if(this.props.errorserver_add.status){
      message.error(this.props.errorserver_add.msg);
      this.props.defaultAdd()
    }
    if(this.props.success_add.status){
      this.setState({
        visible: false
      });
      this.props.defaultAdd()
    }
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields(['email','comment','subject','ipclient'],(err, values,) => {
      if (!err) {
        this.props.commentAdd(values);
      }
    })
  }
  render() {
    const { getFieldDecorator} = this.props.form;
    return (
      <Layout className="layout">
      <Spin spinning={this.props.loading_list}>
        <Drawer
           title="Написать"
           width={720}
           placement="right"
           onClose={this.onClose}
           maskClosable={false}
           visible={this.state.visible}
           style={{
             height: 'calc(100% - 55px)',
             overflow: 'auto',
             paddingBottom: 53,
           }}
         >
         <Spin spinning={this.props.loading_add}>
          <Form layout='vertical' onSubmit={this.handleSubmit}>
           <FormItem label="E-mail">
             {getFieldDecorator('email', {
               rules: [{
                 required: true, message:'E-mail обязательно к заполнению',
                 type: 'email', message: 'Неправильный E-mail!',
               }],
             })(
               <Input />
             )}
           </FormItem>
           <FormItem label="Тема">
             {getFieldDecorator('subject', {
               rules: [{
                 required: true, message:'Тема обязательно к заполнению',
               }],
             })(
               <Input />
             )}
           </FormItem>
           <FormItem label="Коментария">
             {getFieldDecorator('comment', {
               rules: [{
                 required: true, message:'Комментария не может быть пустым',
               }],
             })(
               <TextArea  autosize={{minRows: 4}} />
             )}
           </FormItem>
           <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose}
              >
                Отмена
            </Button>
            <Button  htmlType="submit" type="primary">Отправить</Button>
           </Form>
         </Spin>
        </Drawer>
        <Header>
          <Button type="primary" onClick={this.showDrawer}>
            Написать
          </Button>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {
            this.props.errorserver_list.status ?
                <Row type="flex" justify="center" align="middle">
                  <Col style={{padding: '20px 0'}} span={8}>
                    <Card style={{textAlign: 'center'}}>
                      <h4>{this.props.errorserver_list.msg}</h4>
                    </Card>
                  </Col>
                </Row>
              :
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    locale = {{emptyText: 'Пустой'}}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.email}</a>}
                          description={item.comment}
                        />
                      </List.Item>
                    )}
                  />
          }
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Тестовая задания Chemodan
        </Footer>
      </Spin>
      </Layout>
    );
  }
}
Comments = Form.create()(Comments);
export default Comments
