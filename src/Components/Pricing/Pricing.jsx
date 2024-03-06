import React, { useEffect, useState } from 'react';
import './Pricing.css'; // Import the CSS file containing the custom styles
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import getUserData from '../FirebaseStore/GetUserData';
import { SubscriptionPackage, coinPackages } from './Datas';
import PayStripe from '../StripeComponents/PayStripe';
import { toast } from 'react-toastify';

const Pricing = () => {

    const [isCoin, setIsCoins] = useState(true)
    const [userData, setUserData] = useState(null)
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [PurchasingWhat, setPurchasingWhat] = useState("")
    const [PurchaseAmount, setPurchaseAmount] = useState(0)
    const [pointsPurchasing, setPointPurchasing] = useState(0)

    useEffect(() => {
        GetUserDataFun()
    }, [])
    async function GetUserDataFun() {
        const user = localStorage.getItem("user")
        const ParsedUser = JSON.parse(user)
        if (!ParsedUser) {
            setUserData(false)
        } else {

            const userData = await getUserData(ParsedUser.uid)
            setUserData(userData)
        }

    }


    function hanleCallback(val) {
        if (val === "success") {
            if (PurchasingWhat === "coins") {
                purchasePoints(pointsPurchasing)
            }
            else {
                /////ADD LOGIC TO SUBSCRIPTION
            }
        }
    }

    const purchasePoints = async (requestedPoints) => {
        try {
            // Get user data from local storage
            const user = localStorage.getItem('user');
            const parsedUser = JSON.parse(user);
            console.log("parsedUser", parsedUser)

            // If user data is not found, return an error
            if (!parsedUser) {
                toast.info("Please login or signup first");
            } else {
                // Get Firestore instance
                const db = getFirestore();

                // Reference to the user document
                const userRef = doc(db, 'users', parsedUser.uid);

                // Check if the user document exists
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) {
                    throw new Error('User document does not exist');
                }

                // Update the points attribute in the user document
                await updateDoc(userRef, {
                    points: Number(userSnap.data().points) + Number(requestedPoints),
                });

                // Return success message
                toast.info('Points purchased successfully');
                GetUserDataFun()
                setIsPurchasing(false)
            }


        } catch (error) {
            console.error('Error purchasing points:', error);
            return null;
        }
    };

    //////// BUYING COINS OR SUBSCRIPTION HANDLER.......

    async function hanleBuyNow(identifier, amount, points) {

        if (!userData) {
            toast.info("Please Login First an then purchase the package!")
        }
        else {
            const setAmount = await AmountSetter(amount)
            console.log(setAmount)
            if (setAmount) {
                setIsPurchasing(true)
                setPurchasingWhat(identifier)
                setPointPurchasing(points)
            }

        }
    }

    /////SETTING AMOUNT OF PURCHASE///////////
    async function AmountSetter(amount) {
        setPurchaseAmount(amount)
        return "okay"
    }

    /////// GUI BELOW //////////////

    function SubScriptionPackage() {
        return (
            <>
                {
                    SubscriptionPackage.map((item) => {
                        return (
                            <div className="">
                                <div className="pricing-design">
                                    <div className="single-pricing">
                                        <div className="price-head">
                                            {/* <h2>Purchase Coins</h2> */}
                                            <h1>${item.cost}</h1>
                                            <span>/{item.Period}</span>
                                        </div>
                                        <ul>
                                            <li><b>Unlimited Access</b></li>
                                            <li><b>Save {item.save}%</b></li>

                                            <li><b>200+</b> chapters added monthly</li>
                                            <li><b>No Waiting</b> time for chapters</li>
                                            <li><b>Cancellation</b> at anytime</li>

                                        </ul>
                                        <a href="#" className="price-btn">Subscribe</a>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }


            </>
        )
    }

    function CoinPackage() {
        return (
            <>
                {
                    coinPackages.map((item) => {
                        return (

                            <div className="">
                                <div className="pricing-design">
                                    <div className="single-pricing">
                                        <div className="price-head">
                                            {/* <h2>Purchase Coins</h2> */}
                                            <h1>${item.cost}</h1>
                                            <span>/Use able</span>
                                        </div>
                                        <ul>
                                            <li><b>{item.coins}</b> Coins</li>
                                            <li><b>Unlocks</b> Any Chapter</li>
                                            <li><b>Save</b> {item.save}%</li>

                                        </ul>
                                        <a onClick={() => hanleBuyNow("coins", item.cost, item.coins)} className="price-btn">Buy Now</a>
                                    </div>
                                </div>

                            </div>
                        )

                    })
                }


            </>
        )
    }



    function MainSection() {
        return (
            <section id="pricing" className="pricing-content section-padding">
                <div className="container">
                    <div className="section-title text-center">
                        {
                            userData === false ?
                                <h2>Pring Plans</h2> :
                                <h2>Your Points: {userData != null ? userData.points : 0}</h2>

                        }
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </div>

                    <div className="Choicecontainer" style={{ justifyContent: 'center' }}>
                        <div className='choiceCart row'>
                            <div
                                onClick={() => setIsCoins(true)}
                                className='choiceCart_Inner'
                                style={{ background: isCoin === true ? "#B50E2C" : "#f3f3f3" }}

                            >
                                <p
                                    style={{ color: isCoin === true ? "#f3f3f3" : "#B50E2C" }}

                                >
                                    Buy Coins
                                </p>
                            </div>

                            <div
                                onClick={() => setIsCoins(false)}

                                className='choiceCart_Inner'
                                style={{ background: isCoin === true ? "#f3f3f3" : "#B50E2C" }}

                            >

                                <p
                                    style={{ color: isCoin === true ? "#B50E2C" : "#f3f3f3" }}

                                >
                                    Unlimited Access
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center" style={{ justifyContent: 'center' }}>

                        {isCoin === true ?

                            <CoinPackage /> :
                            <SubScriptionPackage />
                        }

                        {/* Repeat for other pricing options */}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            {
                isPurchasing === true ?
                    <PayStripe
                        amount={PurchaseAmount * 100}
                        hanleCallback={hanleCallback}

                    /> :
                    <MainSection />
            }
        </>

    );
}

export default Pricing;
