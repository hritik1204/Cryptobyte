import React, {useState, useEffect} from 'react'
import millify from "millify";
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from "antd";

import { useCryptosQuery } from '../services/cryptoApi';
import { Spinner } from '@chakra-ui/react';
const Cryptocurrencies = ({simplified}) => {

  
  const count = simplified ? 10: 100;
  const {data:cryptosList , isFetching} = useCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("")
  
   useEffect(()=>{

     const filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(search.toLowerCase()))
     
     setCryptos(filteredData)
   },[cryptosList, search])
   if(isFetching) return <Spinner/>

  
  return (
      <>
        {!simplified &&(
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        )}
        <Row gutter={[32, 32]} className="crypto-card-container">
           {cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                <Link to={`/crypto/${currency.uuid}`}>
                  <Card title={`${currency.rank}. ${currency.name}`}
                        extra={<img className='crypto-image' src={currency.iconUrl} />}
                        hoverable
                        >
                      <p>Price: {millify(currency.price)} </p>
                      <p>Market Cap: {millify(currency.marketCap)} </p>
                      <p>Daily Change: {millify(currency.change)}% </p>
                  </Card>
                </Link>
            </Col>
           ))}
        </Row>
      </>
    )
}

export default Cryptocurrencies