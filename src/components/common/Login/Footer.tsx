import React, { Component } from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100% !important;
  height: 50px !important ;
  background: #eceff1;
  align-items: center;
`

const FooterButton = styled.button`
  border: none;
  margin: 20px;
`

export class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <div style={{ margin: 20 }}>
          <span className="copyRight">©2020 - Solvitude Pty. Ltd. All Rights Reserved</span>
        </div>
        <div style={{ margin: 20 }}>
          <FooterButton className="copyRight">Legal</FooterButton>
          <FooterButton className="copyRight">Contact Us</FooterButton>
          <FooterButton className="copyRight">Help Center</FooterButton>
          <FooterButton className="copyRight">Terms & Conditions</FooterButton>
        </div>
      </FooterContainer>
    )
  }
}
