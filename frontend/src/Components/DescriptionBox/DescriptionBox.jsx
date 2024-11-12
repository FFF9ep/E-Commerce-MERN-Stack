import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>E-commerce, or electronic commerce, is the buying and selling of goods and services over the internet. It allows people to shop online, make transactions, and have items delivered to their homes without visiting a physical store. E-commerce includes various types of transactions, like online retail shopping, auctions, and digital marketplaces, making it convenient for businesses and consumers to connect worldwide.</p>
            <p>
            E-commerce has made shopping easier and more accessible, allowing people to buy products anytime and from anywhere with an internet connection. It also gives businesses a way to reach customers globally, offering a wider range of products and competitive prices.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox
