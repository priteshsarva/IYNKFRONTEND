import React, { useEffect, useState } from 'react'
require('./Home.css')




const Reddit = () => {

  const url = process.env.REACT_APP_URL
  const url2 = "/subReddit"
  const url3 = "/channelCategory"

  const [type, settype] = useState("")
  const [message, setmessage] = useState("")
  const [idd, setidd] = useState("add")
  const [data, setdata] = useState("")
  const [channelCategorydata, setChannelCategorydata] = useState([])

  var checkboxdatatemp = false
  var catlist = ""


  const fromHandle = (e) => {
    e.preventDefault();
    var cname = e.target.cname.value
    var curl = e.target.curl.value

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
      body: JSON.stringify({ subRedditName: cname,subRedditUrl:curl, subRedditCategory:subReddits }), // string, FormData, Blob, BufferSource, or URLSearchParams
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

  const fromHandleUpdate = (e) => {

    e.preventDefault();
    var youtubecategory1 = []

    var cname = e.target.newname.value
    var curl = e.target.newurl.value
    var id = e.target.querySelector(".id").innerHTML



    var categorycheckbox = e.target.querySelectorAll(".categorycheckbox")
    categorycheckbox.forEach(element => {
      if (element.checked) {
        youtubecategory1.push(element.id)
      }
    })



    var datatoUpdate = {}
    if (cname) {
      datatoUpdate.subRedditName = cname
    }
    if (curl) {
      datatoUpdate.subRedditUrl = curl
    }
    datatoUpdate.subRedditCategory = youtubecategory1


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

  const handlenavitemclick = (e) => {
    setidd(e.target.id)
  }
  const alertHandle = () => {
    settype("")
  }

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
        setChannelCategorydata(await dataaa.json())
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
        <h1 className="text-uppercase text-center">SubReddit List</h1>

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

              {data.length > 0 ? <>

                {data.map((currentValue, index, arr) => {

                  return (
                    <>
                      <div className="col-12 col-md-6 row border  mb-3" id={currentValue._id} style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#staticBackdrop${currentValue._id}`} >

                        {/* this one is for profile picture  */}
                        <div className="col-4" id={currentValue._id}>
                          <img className="demo-bg" src={currentValue.subRedditImageUrl} alt="" id={currentValue._id} />
                        </div>

                        {/* details  */}
                        <div className="customtabcontnet text-break col-8" id={currentValue._id} >
                          <h2 id={currentValue._id} style={{ color: '#0d6efd' }}>{currentValue.subRedditName}</h2>


                          {/* subreddits list */}
                          <h4 id={currentValue._id}>
                            {
                              currentValue.subRedditCategory.map((currentValuee, index, arr) => {

                                // subreddits data 
                                channelCategorydata.map(elem => {
                                  if (elem._id === currentValuee) {
                                    catlist = catlist + " " + elem.categoryName + ","
                                  }
                                })
                                // var tc = currentValue.youtubecategory;
                                var size = Object.keys(currentValue.subRedditCategory).length;
                                if (index + 1 === size) {
                                  var temp = catlist
                                  catlist = ""
                                  // !temp ? "" : temp
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
                              <h1 className="modal-title fs-5" id="staticBackdropLabel">{currentValue.subRedditName}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>


                            <form onSubmit={fromHandleUpdate}>
                              <div className="id" style={{ display: "none" }}>{currentValue._id}</div>
                              <div className="modal-body">

                                <label htmlFor="exampleFormControlInput1" className="form-label">New Name</label>
                                <div className="form-floating mb-3">
                                  <input type="text" className="form-control" id="floatingInput" placeholder={currentValue.subRedditName} name='newname' />
                                  <label htmlFor="floatingInput">{currentValue.subRedditName}</label>
                                </div>

                                <label htmlFor="exampleFormControlInput1" className="form-label">New Url</label>
                                <div className="form-floating mb-3">
                                  <input type="text" className="form-control" id="floatingInput" placeholder={currentValue.subRedditUrl} name='newurl' />
                                  <label htmlFor="floatingInput">{currentValue.subRedditUrl}</label>
                                </div>


                                <div className="container">
                                  <div className="justify-content-between row row-cols-1 row-cols-md-2 g-2" style={{ flexDirection: "row", listStyle: "none" }}>
                                    {
                                      channelCategorydata.length === 0 ? <></> : channelCategorydata.map((item, index) => {
                                        
                                        checkboxdatatemp = false
                                        currentValue.subRedditCategory.map((check) => {
                                          if (item._id === check) {
                                            checkboxdatatemp = true
                                            return checkboxdatatemp
                                          }
                                        })
                                        return <>
                                          <div >
                                            <div className="col border">
                                              <input className="form-check-input me-1 categorycheckbox" type="checkbox" value="" id={item._id} defaultChecked={checkboxdatatemp} />

                                              <label className="form-check-label" htmlFor={item._id}>{item.categoryName}</label>
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
                <label htmlFor="exampleFormControlInput1" className="form-label">Subreddit name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="r/name" name="cname" required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Subreddit URL</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="www.reddit.com/r/name" name="curl" required />
              </div>

              <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
              <div className="container" id='uuu'>
                <div className="justify-content-between row row-cols-1 row-cols-md-2 g-2" style={{ flexDirection: "row", listStyle: "none" }}>

                  {
                    channelCategorydata.length === 0 ? <></> : channelCategorydata.map((item, index) => {
                      return <>
                        <div>
                          <div className="col border" >
                            <input className="form-check-input me-1 subridditcheckbox" type="checkbox" value="" id={item._id} />
                            <label className="form-check-label" htmlFor={item._id}>{item.categoryName}</label>
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

export default Reddit
