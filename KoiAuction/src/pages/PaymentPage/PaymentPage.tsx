import './PaymentPage.scss'
function PaymentPage() {
  return (
    <div className='payment-page-container'>
      <div className='payment-page'>
        {/* <div className='breadcrumb'>Home &gt;&gt; Auction &gt;&gt; Asagi #Koi2412 &gt;&gt; Payment</div> */}

        <h2>Check your Koi Payment</h2>

        <div className='info-container'>
          <div className='bid-info'>
            <p>
              <strong>Koi:</strong> Asagi #2412
            </p>
            <p>
              <strong>Bid Time:</strong> September 09, 2024 11:45 pm
            </p>
            <p>
              <strong>Your bid amount:</strong> 150 $
            </p>
            <p>
              <strong>Shipping Method:</strong> Standard Shipping
            </p>
          </div>

          <div className='time-info'>
            <p>
              <strong>Time Left:</strong> 8h 30m 15s
            </p>
            <p>
              <strong>Auction ends:</strong> <span className='highlight'>September 16, 2024 12:00 am</span>
            </p>
          </div>
        </div>

        <h2>Payment</h2>

        <div className='payment-form'>
          <div className='card-logo'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg'
              alt='Mastercard'
              className='card-icon'
            />
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' alt='Visa' className='card-icon' />
          </div>

          <form>
            <label htmlFor='name'>Name on Card</label>
            <input type='text' id='name' name='name' required />

            <label htmlFor='card-number'>Card Number</label>
            <input type='text' id='card-number' name='card-number' required />

            <label htmlFor='address'>Address</label>
            <input type='text' id='address' name='address' required />

            <div className='security-info'>
              <div>
                <label htmlFor='cvc'>CVC</label>
                <input type='text' id='cvc' name='cvc' required />
              </div>

              <div>
                <label htmlFor='expiration'>Expiration</label>
                <input type='text' id='expiration' name='expiration' required />
              </div>
            </div>

            <button type='submit' className='pay-button'>
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
