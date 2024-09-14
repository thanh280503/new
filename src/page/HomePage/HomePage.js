import './HomePage.scss'
import Footer from '../../Component/Footer/Footer'
import Header from '../../Component/Header/Header'
import Search from '../../Component/Search/Search'
import Slider from "react-slick";
import { useEffect, useState } from 'react';

const HomePage = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className="home-page-container">
            <Header />
            <div className='content-home'>
                <div className='content-top'>
                    <img className='image' src='https://static.vexere.com/production/banners/910/Untitled-design.jpg' />
                    <div className='wrapper'>
                        <span className='title'>Vexe - Cam kết hoàn 100% nếu nhà xe không giữ vé</span>
                        <Search />
                    </div>
                </div>
                <div className='list-content'>
                    <div className='route'>
                        <h4>Tuyến đường phổ biến</h4>
                        <Slider {...settings}>

                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=2' />
                                <div className='description'>
                                    <span>Đà Nẵng - Nha Trang</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png' />
                                <div className='description'>
                                    <span>Đà Nẵng - Đà Lạt</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png' />
                                <div className='description'>
                                    <span>Đà Nẵng - Hà Nội</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png' />
                                <div className='description'>
                                    <span>Đà Nẵng - Sài gòn</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1' />
                                <div className='description'>
                                    <span>Đà Nẵng - Sapa</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1' />
                                <div className='description'>
                                    <span>Đà Nẵng - Gia Lai</span>
                                    <span>Giá: 250.000</span>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className='new'>
                        <h4>Vexe có gì mới</h4>
                        <Slider {...settings}>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=4' />
                                <div className='description'>
                                    <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/217/img_card.png?v=2' />
                                <div className='description'>
                                    <span>Các tính năng mới cùng Siêu ứng dụng Vexere</span>

                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/200/img_card.png?v=12' />
                                <div className='description'>
                                    <span>“Bảo hiểm chuyến đi” chính thức ra mắt tại Vexere</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/212/img_card.png?v=14' />
                                <div className='description'>
                                    <span>Chương trình tích điểm đổi quà tại Vexere</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=13' />
                                <div className='description'>
                                    <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
                                </div>
                            </div>
                            <div className='slider-item'>
                                <img src='https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/219/img_card.png?v=2' />
                                <div className='description'>
                                    <span>Tận hưởng nhiều ưu đãi và các tính năng mới cùng Siêu ứng dụng Vexere</span>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className='media'>
                        <h4>Vexe đã được nhắc đến trên</h4>
                        <div className='media-list'>
                            <div className='row'>
                                <div className='item col'>
                                    <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vne.png' />
                                </div>
                                <div className='item col'>
                                    <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vtv.png' />
                                </div>
                                <div className='item col'>
                                    <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-cesti.png' />
                                </div>
                                <div className='item col'>
                                    <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-dantri.png' />
                                </div>
                                <div className='item col'>
                                    <img src='	https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-tuoitre.png' />
                                </div>
                                <div className='item col'>
                                    <img src='https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-fbnc.png' />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='carry'>
                        <h4>Bến xe khách</h4>
                        <div className='carry-list'>
                            <div className='row'>
                                <div className='item col'>
                                    <img src='https://cdn1.nhatrangtoday.vn/images/photos/xe-phuong-trang-top.jpg' />
                                    <span>Bến xe Phương Trang</span>
                                </div>
                                <div className='item col'>
                                    <img src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg' />
                                    <span>Bến xe Miền Đông</span>
                                </div>
                                <div className='item col'>
                                    <img src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg' />
                                    <span>Bến xe Miền Đông</span>
                                </div>
                                <div className='item col'>
                                    <img src='https://xevati.com/wp-content/uploads/2021/10/Xe-khach-dau-trong-ben-xe-da-nang.jpg' />
                                    <span>Bến xe Miền Đông</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default HomePage