import React from 'react'
import './../home.css';
import "./../../../assets/plugins/landing.min.css";
import industry1 from "./../../../assets/home/industry-1.jpg";
import industry2 from "./../../../assets/home/industry-2.jpg";
import industry3 from "./../../../assets/home/industry-3.jpg";
import industry4 from "./../../../assets/home/industry-4.jpg";

import industry5 from "./../../../assets/home/industry-5.jpg";
import industry6 from "./../../../assets/home/industry-6.jpg";
import industry7 from "./../../../assets/home/industry-7.jpg";
import industry8 from "./../../../assets/home/industry-8.jpg";

const SectionTwo = () => (
    <div>
        <section className="container main-features text-center same-height">
            <h2 className="text-left ls-m mb-10" data-animation-options="{
                    'name': 'fadeIn', 'delay': '1.2s'
                }">Major Industries<span className="text-primary ls-m" data-animation-options="{
                    'name': 'blurIn', 'delay': '1.4s'
                }">We Serve</span>
            </h2>
            <div className="row justify-content-center gutter-lg pb-5">
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '1s'
                            }">
                        <div className="icon-box">
                            <img src={industry1} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 1"/>
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    AEROSPACE & AVIONICS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.8s'
                            }">
                        <div className="icon-box">
                            <img src={industry2} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 2" />
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    AUTOMOTIVE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.6s'
                            }">
                        <div className="icon-box">
                            <span className="icon-box-icon mb-4">
                                <img src={industry3} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 3" />
                            </span>
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    MILITARY & DEFENSE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.4s'
                            }">
                        <div className="icon-box">
                            <img src={industry4} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 4"/>
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    ELECTRONICS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="container main-features text-center same-height" style={{ paddingTop: '0px' }}>
            <div className="row justify-content-center gutter-lg pb-5">
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '1s'
                            }">
                        <div className="icon-box ">
                            <img src={industry5} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 5" />
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">

                                    INDUSTRIAL

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.8s'
                            }">
                        <div className="icon-box">
                            <img src={industry6} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 6" />
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    HARDWARE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.6s'
                            }">
                        <div className="icon-box ">
                            <span className="icon-box-icon mb-4">
                                <img src={industry7} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 7" />
                            </span>
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    CUSTOM FABRICATION

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-5">
                    <div className="flip-card flip-card-3d" data-animation-options="{
                                'name': 'fadeInUpShorter', 'delay': '.4s'
                            }">
                        <div className="icon-box ">
                            <img src={industry8} style={{ width: '290px', borderRadius: '13px', marginBottom: '-10px', height: '220px' }} alt="Industry 8" />
                        </div>
                        <div className="icon-box flip-back bg-gradient">
                            <div className="flip-content">
                                <p className="text-white">
                                    EXPORTS
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default SectionTwo