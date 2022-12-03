import React, { useEffect, useState } from "react";
import { history } from "umi";

export default function HomePage() {
  // const [posts, setPosts] = useState<any[]>();

  // async function refresh() {
  //   try {
  //     const res = await fetch("/api/posts");
  //     if (res.status !== 200) {
  //       console.error(await res.text());
  //     }
  //     setPosts(await res.json());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const [test, setTest] = useState<any>();
  const [t1, setT1] = useState<any[]>();
  async function getTest() {
    try {
      const res = await fetch("/api/test");
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setTest(await res.json());
    } catch (err) {
      console.error(err);
    }
  }

  async function getT1() {
    try {
      const res = await fetch("/api/test/t1");
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setT1(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTest();
    getT1();
    // refresh();
    // console.log("加载完成");
  }, []);

  return (
    <div>
      {JSON.stringify(t1)}
      {!test && <p>Loading...</p>}
      {test && (
        <div>
          {Reflect.ownKeys(test).map((v) => (
            <p>
              {v}:{test[v]}
            </p>
          ))}
        </div>
      )}
      {/* {posts && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <div onClick={() => history.push(`/posts/${post.id}`)}>
                <p>{post.title}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
