import AuctionPage from '../../components/AuctionDetail/AuctionDetail'

function AuctionDetailPage() {
  const auctionData = {
    fishDetails: {
      name: 'Asagi #Koi2412',
      variety: 'Doitsu',
      mainImage:
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
      thumbnails: [
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b',
        'https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FKoiFishAuction.png?alt=media&token=6389f149-aea2-4b57-9411-70fd4a3fd32b'
      ],
      location: 'Littlehampton',
      size: '15cm',
      breeder: 'Junnie',
      age: '1',
      deliveryInfo: 'At cost (approx £30) Multiple fish can go in one box',
      contact: '01903 724880'
    },
    auctionInfo: {
      reservePrice: 100,
      startingBid: 150,
      timeLeft: '8h 30m 15s',
      endDate: 'September 16, 2024 12:00 am'
    },
    bidders: [
      { name: 'Purina', amount: 150, time: 'September 9, 2024 6:04 pm' },
      { name: 'Kazuha', amount: 140, time: 'September 9, 2024 7:57 am' }
    ]
  }
  return (
    <div>
      <AuctionPage
        fishDetails={auctionData.fishDetails}
        auctionInfo={auctionData.auctionInfo}
        bidders={auctionData.bidders}
      />
    </div>
  )
}

export default AuctionDetailPage
