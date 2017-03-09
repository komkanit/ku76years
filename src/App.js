import React, { Component } from 'react';
import './App.css';
import domtoimage from 'dom-to-image';
import template from './template.png';

class App extends Component {
  state = {
    text1: 'ครบรอบ 76 ปี รอตะลัยวันนี้ได้นั่งชาติหน้า',
    font1: 20,
    image: '',
    renderedImage: ''
  }
  renderImage() {
    domtoimage.toPng(this.refs.display)
    .then((data) => this.setState({ renderedImage: data }))
    .catch((e) => console.log(e));
  }
  render() {
    return (
      <div className="container" style={{maxWidth: '700px'}}>
        <h1 className="text-center title">
          สร้างรูปโปรไฟล์ครบรอบ 76 ปี KU
        </h1>
        <h2 className="caption">แนะนำให้ใช้งานด้วย Chrome บนคอมพิวเตอร์</h2>
        <div className="row edit-section">
          <div className="form-group">
            <label>
              อัพโหลดรูปภาพ:
            </label>
            <input className="form-control" type="file" accept="image/*" onChange={(e) => {
              const reader = new FileReader();
              reader.addEventListener('load', () => {
                this.setState({ image: reader.result }, this.renderImage);
              })
              if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
              }
            }} />
          </div>
          {
            this.state.image && this.state.image !== '' &&
            <div className="form-group">
              <label>
                แก้ไขคำด้านล่าง:
              </label>
              <input className="form-control" type="text" placeholder="quote 1" value={this.state.text1}
                onChange={(e) => this.setState({ text1: e.target.value }, this.renderImage)} />
            </div>
          }

        </div>
        <hr />
        <div className="display-section form-group" ref="display"
          style={{background: `url(${this.state.image})`}}
          >
          { this.state.image && this.state.image !== '' &&
            <img className="template" alt="background" src={template} />
          }
          <div className="text-area">
            <p className="big text small-line"
              style={{fontSize: `${this.state.font1}px`}}
              >
              {this.state.text1}</p>
          </div>
        </div>
        {
          this.state.image !== '' && this.state.renderedImage === '' &&
          <p className="caption">ไม่สามารถดาวน์โหลดภาพได้<br/>สามารถใช้การ Capture หน้าจอเพื่อนำภาพไปใช้ได้ หรือเปิดด้วย Chrome</p>
        }
        { this.state.renderedImage && this.state.renderedImage !== '' &&
          <div className="text-center form-group">
            <a className="btn btn-lg btn-primary" href={this.state.renderedImage} download="ku76.png"
            >ดาวน์โหลด</a>
          <p className="caption">หากภาพที่ดาวโหลดมีปัญหา<br/>สามารถใช้การ Capture หน้าจอได้</p>
          </div>
        }

      </div>
    );
  }
}

export default App;
