import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import windowSize from 'react-window-size';

import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";
import { Link } from 'react-router-dom';

class NavLeft extends Component {

    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        let dropdownRightAlign = false;
        if (this.props.rtlLayout) {
            dropdownRightAlign = true;
        }

        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen"><i className={iconFullScreen.join(' ')} /></a></li>
                    <li className={navItemClass.join(' ')}>
                        <Dropdown alignRight={dropdownRightAlign}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings" style={{marginRight: '4px'}}/>  Cài đặt <i className="icon feather icon-chevron-down"/>
                            </Dropdown.Toggle>
                            <ul>
                                <Dropdown.Menu className="dropdown-menu-left">
                                    <li><Link to='/setting/introduce' className="dropdown-item">Giới thiệu</Link></li>
                                    <li><Link to='/setting/info-contact' className="dropdown-item">Thông tin liên hệ</Link></li>
                                    <li><Link to='/setting/list-contact' className="dropdown-item">Danh sách liên hệ</Link></li>
                                    <li><Link to='/setting/slide' className="dropdown-item">Slide</Link></li>
                                </Dropdown.Menu>
                            </ul>
                        </Dropdown>
                    </li>
                    <li className="nav-item"><NavSearch/></li>
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.mainReducer.isFullScreen,
        rtlLayout: state.mainReducer.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
