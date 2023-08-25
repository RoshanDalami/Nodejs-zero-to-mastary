import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8001/";
const Test = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
//   const {id} = useParams();
 
  const [userTitle, setUserTitle] = useState("");
  const [isEmpty,setIsEmpty] = useState(false);

  const retriveData = async () => {
    const response = await fetch(`${BASE_URL}test`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    retriveData();
  }, [data]);

  
  const onSubmitLaunch = async (event) => {
      const userData = {
          title: userTitle,
        };
        event.preventDefault();
        
        await  fetch("http://localhost:8001/test", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if(userTitle.trim().length === 0){
            
            setIsEmpty(true)
        }
        setUserTitle('')
        // const data = response.json();
    };

    const onDeleteTest = async (id)=>{
        try{
            navigate(`/test/${id}`)
            await fetch(`http://localhost:8001/test/${id}`,{
                method:'DELETE',
            })

        }catch(err){
            console.log(err)
        }
        
        
    }
    
    const Data = (
      <ul>
        {data.map((item) => {
          return <li key={item.id} onClick={()=>{
            onDeleteTest(item.id)

          }}>{item.title} </li>;
        })}
      </ul>
    );

  return (
    <>
    {isEmpty && <p style={{color:'red'}}>Please Enter Title</p> }
      <form action="" onSubmit={onSubmitLaunch}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => {
            setUserTitle(e.target.value);
            setIsEmpty(false)
          }}
          value={userTitle}

        />
        <button type="submit">Submit</button>
      </form>

      {Data}
    </>
  );
};

export default Test;
