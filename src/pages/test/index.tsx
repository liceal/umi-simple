import React, { useEffect, useState } from "react";
import indexLess from "./index.less";

export default function test() {
  const [posts, setPosts] = useState<any[]>();

  async function addPost() {
    try {
      const res = await fetch("/api/test/posts", {
        method: "POST",
        body: JSON.stringify({
          title: "模拟新增",
          content: "模拟内容",
          tags: ["测试标签"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        console.error(await res.text());
      }
      // console.log(await res.json());

      const data = await res.json();
      console.log(data);
      getPosts();
    } catch (err) {
      console.error(err);
    }
  }

  async function getPosts() {
    try {
      const res = await fetch("/api/test/posts", {
        method: "GET",
      });

      if (res.status !== 200) {
        console.error(await res.text());
      }

      const data = await res.json();
      console.log(data);

      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDetail(id: number) {
    try {
      const res = await fetch(`/api/test/posts/${id}`, {
        method: "GET",
      });

      const data = await res.json();

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function del(id: number) {
    try {
      const res = await fetch(`/api/test/posts/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);

        getPosts();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function edit(item: any) {
    console.log(item);
    try {
      const res = await fetch(`/api/test/posts/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          content: item.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);

        getPosts();
      }
    } catch (e) {
      console.error(e);
    }
  }

  function itemContentChange(item: any, e: any) {
    // console.log(item, e.target.value);
    item.content = e.target.value;
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>测试</h1>
      <p>
        <button onClick={addPost}>新增数据</button>
        <button onClick={getPosts}>查询数据</button>
      </p>
      {!posts && <span>没有数据哦～</span>}
      {
        // posts && JSON.stringify(posts)
        posts?.map((v) => {
          return (
            <div key={v.id} className={indexLess.item}>
              <button onClick={() => getDetail(v.id)}>详细数据</button>
              <div>ID:{v.id}</div>
              <div>名字:{v.title}</div>
              <div>创建时间:{v.createdAt}</div>
              <div>更新时间:{v.updatedAt}</div>
              <div>内容:{v.content}</div>

              <p>
                更改内容：
                <input
                  defaultValue={v.content}
                  onChange={(e) => itemContentChange(v, e)}
                />
                <button onClick={() => edit(v)}>修改内容</button>
              </p>

              <button onClick={() => del(v.id)}>删除数据</button>
            </div>
          );
        })
      }
    </div>
  );
}
