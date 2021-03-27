import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import Logo from '../../assets/images/logo.svg'
import Bitcoin from '../../assets/images/bitcoin.svg'

import IconSearch from '../../assets/images/icons/pesquisa.svg'
import IconArrowRight from '../../assets/images/icons/seta-para-direita.svg' 
import IconArrowTop from '../../assets/images/icons/seta-para-cima.svg'
import IconArrowBottom from '../../assets/images/icons/seta-para-baixo.svg'
import IconPriceUltimateNegociation from '../../assets/images/icons/preco-da-ultima-negociacao.svg'
import IconSmaller from '../../assets/images/icons/diminuicao-de-preco.svg'
import IconLarger from '../../assets/images/icons/aumento-de-preco.svg'

import './style.css'

interface Cripto {
  name: string;
  high: number;
  low: number;
  vol: number;
  last: number;
  buy: number;
  sell: number;
  date: number;
}

export default function Landing() {
  const [cripto, setCripto] = useState({} as Cripto)
  const [criptoForm, setCriptoForm] = useState('')
  const [isOpenDetail, setIsOpenDetail] = useState(false)

  useEffect(() => {
    axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/')
      .then(response => {
        const responseCripto = response.data.ticker as Cripto
        responseCripto.name = 'Bitcoin' 

        setCripto(responseCripto)
      })
  }, [])

  function handleOpenDetailCripto() {
    setIsOpenDetail(true)
  }

  function handleSubmitFormCripto(event: FormEvent) {
    event.preventDefault();
    setIsOpenDetail(false)

    axios.get(`https://www.mercadobitcoin.net/api/${criptoForm}/ticker/`)
      .then(response => {
        const responseCripto = response.data.ticker as Cripto

        switch (criptoForm) {   
          case 'ACMFT': responseCripto.name = 'Fan Token ASR'
            break
          case 'ACORDO01': responseCripto.name = 'None'
            break
          case 'ASRFT': responseCripto.name = 'Fan Token ASR'
            break
          case 'ATMFT': responseCripto.name = 'Fan Token ATM'
            break
          case' BCH': responseCripto.name = 'Bitcoin Cash'
            break
          case 'BTC': responseCripto.name = 'Bitcoin'
            break
          case 'CAIFT': responseCripto.name = 'Fan Token CAI'
            break
          case 'CHZ': responseCripto.name = 'Chiliz'
            break
          case 'ETH': responseCripto.name = 'Ethereum'
            break
          case 'GALFT': responseCripto.name = 'Fan Token GAL'
            break
          case 'IMOB01': responseCripto.name = 'None'
            break
          case 'JUVFT': responseCripto.name = 'Fan Token JUV'
            break
          case 'LINK': responseCripto.name = 'CHAINLINK'
            break
          case 'LTC': responseCripto.name = 'Litecoin'
            break
          case 'MBCONS01': responseCripto.name = 'Cota de Consórcio 01'
            break
          case 'MBCONS02': responseCripto.name = 'Cota de Consórcio 02'
            break
          case 'MBFP01': responseCripto.name = 'None'
            break
          case 'MBFP02': responseCripto.name = 'None'
            break
          case 'MBPRK01': responseCripto.name = 'Precatório MB SP01'
            break
          case 'MBPRK02': responseCripto.name = 'Precatório MB SP02'
            break
          case 'MBPRK03': responseCripto.name = 'Precatório MB BR03'
            break
          case 'MBPRK04': responseCripto.name = 'Precatório MB RJ04'
            break
          case 'MBVASCO01': responseCripto.name = 'MBVASCO01'
            break
          case 'MCO2': responseCripto.name = 'MCO2'
            break
          case 'OGFT': responseCripto.name = 'Fan Token ASR'
            break
          case 'PAXG': responseCripto.name = 'PAX Gold'
            break
          case 'PSGFT': responseCripto.name = 'Fan Token PSG'
            break
          case 'USDC': responseCripto.name = 'USD Coin'
            break
          case 'WBX': responseCripto.name = 'WiBX'
            break
          case 'XRP': responseCripto.name = 'XRP'
            break          
        }

        setCripto(responseCripto)
      })
  }

  return(
    <div id="page-landing" >
      <header>
        <img src={Logo} alt="Logo"/>
        <form onSubmit={handleSubmitFormCripto} >
          <input 
            type="text"
            name="cripto"
            placeholder="Buscar por uma moeda"
            onChange={event => setCriptoForm(event.target.value)}
          />
          <button>
            <img src={IconSearch} alt="Pesquisar"/>
          </button>
        </form>
      </header>

      <section>
        <div className="cripto">
          <header>
            <div>
              <img src={Bitcoin} alt="Bitcoin"/>
              <h1>{cripto.name}</h1>
            </div>
            <strong>R$ {cripto.last}</strong>
          </header>
          <main>
            <p>{cripto.vol} bitcoins negociados nas últimas 24hs</p>
            <button
              type="button"
              onClick={handleOpenDetailCripto}
            >
              Veja mais<img src={IconArrowRight} alt="Detalhes"/>
            </button>
          </main>
        </div>

        {
          isOpenDetail && (
            <div className="detail">
              <header>
                <div>
                  <img src={Bitcoin} alt="Bitcoin"/>
                  <h1>Bitcoin</h1>
                </div>
                <p>Nas ultimas 24hrs</p>
              </header>
              <main>
                <div>
                  <img src={IconArrowTop} alt="Maior preço"/>
                  <p>Maior preço negociado:<strong>{cripto.high}</strong></p>
                </div>
                
                <div>
                  <img src={IconArrowBottom} alt=""/>
                  <p>Menor preço negociado:<strong>{cripto.low}</strong></p>
                </div>

                <div>
                  <img src={IconPriceUltimateNegociation} alt=""/>
                  <p>Preço da última negociado:<strong>{cripto.last}</strong></p>
                </div>

                <div>
                  <img src={IconSmaller} alt=""/>
                  <p>Menor preço de oferta de venda:<strong>{cripto.sell}</strong></p>
                </div>

                <div>
                  <img src={IconLarger} alt=""/>
                  <p>Maior preço de oferta de compra:<strong>{cripto.buy}</strong></p>
                </div>
              </main>
            </div>
          )
        }
      </section>
    </div>
  )
}