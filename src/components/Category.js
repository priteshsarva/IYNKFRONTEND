import React, { useEffect, useState } from 'react'
import channelcategoryimage from '../assets/images/channelCategory.jpg'
require('./Home.css')



const Category = () => {

    const url = process.env.REACT_APP_URL
    const url2 = "/channelCategory"
    const url3 = "/subReddit"


    const [type, settype] = useState("")
    const [message, setmessage] = useState("")
    const [idd, setidd] = useState("add")
    const [data, setdata] = useState("")
    var catlist = ""
    var checkboxdatatemp = false

    const [subRedditdata, setSetsubRedditdata] = useState([])



    const fromHandle = (e) => {
        e.preventDefault();
        var cname = e.target.cname.value
        var subReddits = []

        

        var categorycheckbox = e.target.querySelectorAll(".subridditcheckbox")
        categorycheckbox.forEach(element => {

            if (element.checked) {
                subReddits.push(element.id)
            }
        })

        fetch(url + url2, {
            method: "POST", // POST, PUT, DELETE, etc.
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryName: cname, subReddits }), // string, FormData, Blob, BufferSource, or URLSearchParams
        }).then(async (res) => {
            setmessage(await res.json())
            

            if (res.status === "201") {
                e.target.cname.value = ""

                subReddits = []

                fetch(url + url2, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async dataa => {
                    setdata(await dataa.json())


                })
                settype("success")
            } else {
                settype("warning")
            }

        });

    }

    const handlenavitemclick = (e) => {
        setidd(e.target.id)
    }

    const fromHandleUpdate = (e) => {

        e.preventDefault();
        var youtubecategory1 = []

        var cname = e.target.newname.value
        var id = e.target.querySelector(".id").innerHTML



        var categorycheckbox = e.target.querySelectorAll(".categorycheckbox")
        categorycheckbox.forEach(element => {
            if (element.checked) {
                youtubecategory1.push(element.id)
            }
        })



        var datatoUpdate = {}
        if (cname) {
            datatoUpdate.categoryName = cname
        }
        datatoUpdate.subReddits = youtubecategory1




        fetch(url + url2 + "/" + id, {
            method: "PATCH", // POST, PUT, DELETE, etc.
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datatoUpdate), // string, FormData, Blob, BufferSource, or URLSearchParams
        }).then(async (res) => {

            setmessage(await res.json())
            if (res.status === "201") {

                var categorycheckbox = e.target.querySelectorAll(".categorycheckbox")
                categorycheckbox.forEach(element => {
                    element.checked = false
                })

                e.target.cname.value = ""

                youtubecategory1 = []

                fetch(url + url2, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async dataa => {
                    setdata(await dataa.json())
                })
                settype("success")
            } else {
                settype("warning")
            }

        });

    }

    const handledelete = (e) => {
        fetch(url + url2 + "/" + e.target.id, {
            method: "DELETE", // POST, PUT, DELETE, etc.
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },

        }).then(async (res) => {

            setmessage(await res.json())
            if (res.status === "201") {
                fetch(url + url2, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async dataa => {
                    setdata(await dataa.json())
                })
                settype("success")
            } else {
                settype("warning")
            }

        });
    }

    const alertHandle = () => {
        settype("")
    }


    window.addEventListener('DOMContentLoaded', () => {

        //fetch all data from Category list
        fetch(url + url2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async dataa => {
            setdata(await dataa.json())
        })

        //fetch all data from subreddits list
        fetch(url + url3, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async dataaa => {
            // category = await dataaa.json()
            setSetsubRedditdata(await dataaa.json())
        })

    })

    useEffect(() => {

        if (idd === "add") {
            var element = document.getElementById("add");
            element.classList.add("active");
            element = document.getElementById("edit");
            element.classList.remove("active");

            //fetch all data from subreddits list
            fetch(url + url3, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(async dataaa => {
                // category = await dataaa.json()
                setSetsubRedditdata(await dataaa.json())
            })

        } else {
            var element = document.getElementById("edit");
            element.classList.add("active");
            element = document.getElementById("add");
            element.classList.remove("active");

            fetch(url + url2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(async dataa => {
                setdata(await dataa.json())
            })
        }

    }, [idd])

    return (
        <>
            {/* Alert Message  */}
            <div id="liveAlertPlaceholder">
                {type ? <>
                    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                        <div>{message.message}</div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={alertHandle}></button>
                    </div>
                </> : ""}
            </div>
            <button type="button" className="btn btn-primary" id="liveAlertBtn" style={{ display: "none " }}>sdsdsa</button>

            {/* Main Content  */}
            <div className="container  mt-5 ">

                {/* Page Title  */}
                <h1 className="text-uppercase text-center">Youtube Category List</h1>

                {/* Page Conatiner  */}
                <div className="container p-5 " style={{ width: '95%' }}>

                    {/* Add And Edit Menu */}
                    <ul className="nav nav-tabs justify-content-around">
                        <li className="nav-item">
                            <a className="nav-link active" id='add' aria-current="page" style={{ color: 'black', cursor: "pointer" }} onClick={handlenavitemclick}>ADD</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id='edit' style={{ color: 'black', cursor: "pointer" }} onClick={handlenavitemclick}>EDIT</a>
                        </li>
                    </ul>

                    {/* Edit Menu then Add Menu */}
                    {idd === "edit" ? <>

                        <div className="customtable justify-content-between row">

                            {data !== "" ? <>
                                {data.map((currentValue, index, arr) => {
                                    
                                    return (
                                        <>
                                            <div className="col-12 col-md-6 row border  mb-3" id={currentValue._id} style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#staticBackdrop${currentValue._id}`} >

                                                {/* this one is for profile picture  */}
                                                <div className="col-4" id={currentValue._id}>
                                                    <img className="demo-bg" src={channelcategoryimage} alt="" id={currentValue._id} />
                                                </div>

                                                {/* details  */}
                                                <div className="customtabcontnet text-break col-8" id={currentValue._id} >
                                                    <h2 id={currentValue._id} style={{ color: '#0d6efd' }}>{currentValue.categoryName}</h2>


                                                    {/* subreddits list */}
                                                    <h4 id={currentValue._id}>
                                                        {
                                                            currentValue.subReddits.map((currentValuee, index, arr) => {
                                                               
                                                                // subreddits data 
                                                                subRedditdata.map(elem => {
                                                                    if (elem._id === currentValuee) {
                                                                        catlist = catlist + " " + elem.subRedditName + ","
                                                                    }
                                                                })
                                                                // var tc = currentValue.youtubecategory;
                                                                var size = Object.keys(currentValue.subReddits).length;
                                                                if (index + 1 === size) {
                                                                    var temp = catlist
                                                                    catlist = ""
                                                                    return temp;
                                                                }
                                                            })
                                                        }
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* modal */}
                                            <div className="modal fade" id={`staticBackdrop${currentValue._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{currentValue.categoryName}</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>


                                                        <form onSubmit={fromHandleUpdate}>
                                                            <div className="id" style={{ display: "none" }}>{currentValue._id}</div>
                                                            <div className="modal-body">

                                                                <label htmlFor="exampleFormControlInput1" className="form-label">New Name</label>

                                                                <div className="form-floating mb-3">
                                                                    <input type="text" className="form-control" id="floatingInput" placeholder={currentValue.categoryName} name='newname' />
                                                                    <label htmlFor="floatingInput">{currentValue.categoryName}</label>
                                                                </div>

                                                                <div className="container">
                                                                    <div className="justify-content-between row row-cols-1 row-cols-md-2 g-2" style={{ flexDirection: "row", listStyle: "none" }}>
                                                                        {
                                                                            subRedditdata.length === 0 ? <></> : subRedditdata.map((item, index) => {
                                                                                checkboxdatatemp = false
                                                                                currentValue.subReddits.map((check) => {
                                                                                    if (item._id === check) {
                                                                                        checkboxdatatemp = true
                                                                                        return checkboxdatatemp
                                                                                    }
                                                                                })
                                                                                return <>
                                                                                    <div >
                                                                                        <div className="col border">
                                                                                            <input className="form-check-input me-1 categorycheckbox" type="checkbox" value="" id={item._id} defaultChecked={checkboxdatatemp} />

                                                                                            <label className="form-check-label" htmlFor={item._id}>{item.subRedditName}</label>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" name='delete' id={currentValue._id} onClick={handledelete}>Delete</button>
                                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Update</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </> : <h1>No records Found</h1>}
                        </div>
                    </> : <>

                        <form className="" onSubmit={fromHandle} style={{ paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "5%", paddingRight: "5%" }}>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Category name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" name="cname" required />
                            </div>

                            <label htmlFor="exampleFormControlInput1" className="form-label">subReddits</label>
                            <div className="container" id='uuu'>
                                <div className="justify-content-between row row-cols-1 row-cols-md-2 g-2" style={{ flexDirection: "row", listStyle: "none" }}>

                                    {
                                        subRedditdata.length === 0 ? <></> : subRedditdata.map((item, index) => {
                                            return <>
                                                <div>
                                                    <div className="col border" >
                                                        <input className="form-check-input me-1 subridditcheckbox" type="checkbox" value="" id={item._id} />
                                                        <label className="form-check-label" htmlFor={item._id}>{item.subRedditName}</label>
                                                    </div>
                                                </div>
                                            </>
                                        })

                                    }
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <button className="btn btn-primary" type="submit">Submit form</button>
                            </div>

                        </form>


                    </>}
                </div>

            </div>
        </>
    )
}

export default Category
