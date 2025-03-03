import * as React from 'react'
import '../components/css/contactus.css'
import { Helmet } from "react-helmet"

const ContactUs = () => {
  return (
    <>
    <Helmet>
      <title>Contact Us</title>
    </Helmet>
        <div className="container-fluid pb-5 pt-4 products px-5 bg-black">
          <div className={`containercu`}>
            <h1>Connect with us</h1>
            <p>We would love to response your queries and help you succeed. <br /> Feel free to get in touch with us.</p>
            <div className={`contactbox rounded`}>
              <div className={`contactleft p-5`}>
                <h3>Send your request</h3>
                <form>
                  <div className={`inputrow`}>
                    <div className={`inputgroup`}>
                      <label>Name</label>
                      <input type="text" placeholder="Rhaenyra Targaryen" />
                    </div>
                      
                    <div className={`inputgroup`}>
                      <label>Contact Number</label>
                      <input type="text" placeholder="+977-9812345678" />
                    </div>
                  </div>
                      
                  <div className={`inputrow`}>
                    <div className={`inputgroup`}>
                      <label>Email</label>
                      <input type="email" 
                      placeholder="rhaenyra.targaryen@gmail.com" />
                    </div>
                      
                    <div className={`inputgroup`}>
                      <label>Subject</label>
                      <input type="text" placeholder="Product Demo" />
                    </div>
                  </div>

                  <label>Message</label>
                  <textarea rows="5" placeholder="Your Message"></textarea>
                
                  <button type="submit">Send</button>
                </form>
              </div>
              <div className={`contactright p-5 rounded-end`}>
                  <h3>Reach Us</h3>

                  <table>
                      <tr>
                          <td>Email</td>
                          <td>binayaraj.thapa@gmail.com</td>
                      </tr>
                      <tr>
                          <td>Contact Number</td>
                          <td>+977 9810117772</td>
                      </tr>
                      <tr>
                          <td>Address</td>
                          <td>Kathmandu University, Dhulikhel 45200</td>
                      </tr>
                  </table>
              </div>
          </div>
          </div>
        </div>
    </>
  )
}

export const Head = () => <title>Contact Us</title>

export default ContactUs