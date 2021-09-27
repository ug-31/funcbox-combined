import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const ListBucket = ({ isAuthenticated }) => {
  const [buckets, setBuckets] = useState([]);

  const getBuckets = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/bucket", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      if (parseRes.name) {
        setBuckets(parseRes.buckets);
        toast.success("Buckets Fetched Successfully");
      } else {
        toast.error("Please Login to view your Buckets");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBuckets();
  }, []);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Bucket Name</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {isAuthenticated === true &&
            buckets.map((bucket) => (
              <tr key={bucket._id}>
                <td>{bucket.bname}</td>
                <td>{bucket.text}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListBucket;
