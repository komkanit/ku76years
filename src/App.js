import React, { Component } from 'react';
import './App.css';
import domtoimage from 'dom-to-image';
import template from './template.png';

class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    font1: 40,
    font2: 35,
    font3: 25,
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
        <h1 className="text-center">
          YWC QUOTE
        </h1>
        <h2 className="caption">แนะนำให้ใช้งานด้วย Chrome บนคอมพิวเตอร์</h2>
        <div className="edit-section">
          <div className="row form-group">
            <div className="col-sm-2">
              อัพโหลดไฟล์
            </div>
            <div className="col-sm-10">
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
          </div>
          {
            this.state.image && this.state.image !== '' && <div>
              <div className="row form-group">
                <div className="col-sm-12">
                  <input className="form-control" type="text" placeholder="quote 1" value={this.state.text1}
                    onChange={(e) => this.setState({ text1: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-2">ขนาดอักษร</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" value={this.state.font1}
                    onChange={(e) => this.setState({ font1: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-12">
                  <input className="form-control" type="text" placeholder="quote 2" value={this.state.text2}
                    onChange={(e) => this.setState({ text2: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-2">ขนาดอักษร</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" value={this.state.font2}
                    onChange={(e) => this.setState({ font2: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <hr />
              <div className="row form-group">
                <div className="col-sm-12">
                  <input className="form-control" type="text" placeholder="quote 3" value={this.state.text3}
                    onChange={(e) => this.setState({ text3: e.target.value }, this.renderImage)} />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-2">ขนาดอักษร</div>
                <div className="col-sm-3">
                  <input className="form-control" min="0" max="100" type="number" value={this.state.font3}
                    onChange={(e) => this.setState({ font3: e.target.value }, this.renderImage)} />
                </div>
              </div>
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
            <p className="big text"
              style={{fontSize: `${this.state.font2}px`}}
              >
              {this.state.text2}</p>
            <p className="small text"
              style={{fontSize: `${this.state.font3}px`}}
              >{this.state.text3}</p>
          </div>
        </div>
        {
          this.state.image !== '' && this.state.renderedImage === '' &&
          <p className="caption">แนะนำให้ใช้งานด้วย Chrome บนคอมพิวเตอร์ อาจไม่สามารถดาวน์โหลดภาพได้ใน Browser อื่นๆ สามารถใช้การ Capture หน้าจอเพื่อนำภาพไปใช้ได้</p>
        }
        { this.state.renderedImage && this.state.renderedImage !== '' &&
          <div className="text-center form-group">
            <a className="btn btn-lg btn-primary" href={this.state.renderedImage} download="ywc-quote.png"
            >ดาวน์โหลด</a>
          <p className="caption">หากภาพที่ดาวโหลดมีปัญหา<br/>สามารถใช้การ Capture หน้าจอได้</p>
          </div>
        }

      </div>
    );
  }
}

export default App;
