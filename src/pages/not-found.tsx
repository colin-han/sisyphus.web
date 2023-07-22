'use client';

import { useRef, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Image from 'next/image';
import './404.css';
import img from '/public/404.jpg';

export default function NotFound() {
    const words = ["Oops!", "抱歉！", "哎呀！", "天啊！", "糟糕！", "噢不！"];

    const [oops, setOops] = useState(words[0]);
    useInterval(() => setOops(words[Math.floor(Math.random() * words.length)]), 1000);

    return (<>
        <div className="container">
            <Image style={{display: 'inline-block'}} src={img} alt="404错误页面" />
            <h1 id="error-word">{oops}</h1>
            <p>很抱歉，您访问的页面不存在！</p>
        </div>
        <div className="footer" style={{ position: "fixed", bottom: 0, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0", padding: 8 }}>
                <a href="http://www.beian.miit.gov.cn/" target="_blank"
                    style={{ fontSize: 12, color: "#333", textDecoration: "none", marginRight: 8 }}>
                    陕ICP备18004529号-1
                </a>
            </div>
        </div>
    </>);
}