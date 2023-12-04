import React from 'react';
import {ReactComponent as TelegramIcon} from "../../assets/icons/telegram-svgrepo-com.svg";
import {ReactComponent as EmailIcon} from "../../assets/icons/email-svgrepo-com.svg";
import {ReactComponent as GithubIcon} from "../../assets/icons/github-142-svgrepo-com.svg";
import {ReactComponent as PhoneIcon} from "../../assets/icons/phone-svgrepo-com.svg";
import {ReactComponent as LinkedInIcon} from "../../assets/icons/linkedin-svgrepo-com.svg";
import {ReactComponent as GoogleDriveIcon} from "../../assets/icons/google-drive-svgrepo-com.svg";

const Footer = () => {
  return (
    <footer>
      <section id={"contacts"} className={'container'}>
        <h2>Contacts</h2>
        <div>
          <a target="_blank" href="https://www.linkedin.com/in/serhii-denysiuk-5554a9224/">
            <LinkedInIcon/>
            <div>linkedin.com/in/serhii-denysiuk-5554a9224</div>
          </a>
          <a href="mailto:serhiidenysiuk22@gmail.com">
            <EmailIcon/>
            <div>serhiidenysiuk22@gmail.com</div>
          </a>
          <a target="_blank" href="https://github.com/SerhiiDenysiuk23">
            <GithubIcon/>
            <div>github.com/SerhiiDenysiuk23</div>
          </a>
          <a href="tel:+380680030332">
            <PhoneIcon/>
            <div>+380680030332</div>
          </a>
          <a target="_blank" href="https://t.me/green_201">
            <TelegramIcon/>
            <div>@green_201</div>
          </a>
          <a target="_blank" href="https://drive.google.com/file/d/1d66mZ3nCymGqaYsCCNzBW7mP6LepcFrH/view?usp=sharing">
            <GoogleDriveIcon/>
            <div>CV</div>
          </a>
        </div>

        {/*<table>*/}
        {/*  <tbody>*/}
        {/*<tr>*/}
        {/*  <td>*/}
        {/*    <a href="https://www.linkedin.com/in/serhii-denysiuk-5554a9224/">*/}
        {/*      <LinkedInIcon/>*/}
        {/*      linkedin.com/in/serhii-denysiuk-5554a9224*/}
        {/*    </a>*/}
        {/*  </td>*/}
        {/*  <td><a href="mailto:serhiidenysiuk22@gmail.com"><EmailIcon/>serhiidenysiuk22@gmail.com</a></td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td>*/}
        {/*    <a href="https://github.com/SerhiiDenysiuk23">*/}
        {/*      <GithubIcon/>*/}
        {/*      github.com/SerhiiDenysiuk23*/}
        {/*    </a>*/}
        {/*  </td>*/}
        {/*  <td><a href="tel:+380680030332"><PhoneIcon/>+380680030332</a></td>*/}
        {/*</tr>*/}
        {/*  <tr>*/}
        {/*    <td><a href="https://t.me/green_201"><TelegramIcon/>@green_201</a></td>*/}
        {/*    <td><a href="/"></a></td>*/}
        {/*  </tr>*/}
        {/*  </tbody>*/}
        {/*</table>*/}
      </section>
    </footer>
  );
};

export default Footer;