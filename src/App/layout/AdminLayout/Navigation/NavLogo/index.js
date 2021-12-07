import React from 'react';
import DEMO  from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import Logo from '../../../../../assets/images/logo.png';
import {
    SettingOutlined
  } from '@ant-design/icons';
const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
                    <div className="b-bg">
                        {/* <i className="feather icon-trending-up" /> */}
                        <SettingOutlined />
                    </div>
                    <h1 className="b-title">Setting</h1>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
