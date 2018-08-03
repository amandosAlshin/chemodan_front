import React, { Component } from 'react';
import {List,Layout,Form, Avatar,Drawer,Input,Button} from 'antd';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const styleBlock = {
  width: '120px',
  height: '31px',
  background: 'rgba(255,255,255,.2)',
  margin: '16px 24px 16px 0',
  float: 'left'
}
class Comments extends Component {
  constructor(props){
    super(props)
    this.state= {
      visible: false
    }
    this.showDrawer = this.showDrawer.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  showDrawer(){
    this.setState({
      visible: true,
    });
  }
  onClose(){
    this.setState(
      {
        visible: false,
      }
    );
  }
  render() {
    const { getFieldDecorator} = this.props.form;
    return (
      <Layout className="layout">
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
         <Form layout='vertical' onSubmit={this.handleSubmit}>
           <FormItem label="E-mail">
             {getFieldDecorator('email', {
               rules: [{
                 required: true, message:'E-mail обязательно к заполнению',
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
             {getFieldDecorator('comments', {
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
        </Drawer>
        <Header>
          <Button type="primary" onClick={this.showDrawer}>
            Написать
          </Button>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Тестовая задания Chemodan
        </Footer>
      </Layout>
    );
  }
}
Comments = Form.create()(Comments);
export default Comments
