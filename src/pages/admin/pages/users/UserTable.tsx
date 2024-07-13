import React, { useEffect, useState } from 'react';
import './UserTable.scss';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Role, User } from "@/store/slices/user.slice";
import { useTranslation } from 'react-i18next';
import api from "@/api";
import { Table } from 'react-bootstrap';


interface Permission {
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
}

interface PermissionItem {
  title: string;
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
}

const UserTable: React.FC = () => {
  const { t } = useTranslation();
  const userStore = useSelector((store: any) => store.user);

  const [permission, setPermission] = React.useState<Permission>({
    read: false,
    create: false,
    delete: false,
    update: false
  })

  useEffect(() => {
    setPermission({
      ...permission,
      read: userStore.data?.permission?.includes('user.r') || userStore.data?.permission?.includes('user.*') || false,
      create: userStore.data?.permission?.includes('user.c') || userStore.data?.permission?.includes('user.*') || false,
      delete: userStore.data?.permission?.includes('user.d') || userStore.data?.permission?.includes('user.*') || false,
      update: userStore.data?.permission?.includes('user.u') || userStore.data?.permission?.includes('user.*') || false,
    })
  }, [])

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    api.user.findAll()
      .then(res => {
        if (res.status == 200) {
          setUsers(res.data)
          console.log("res.data", res.data)
        }
      })
  }, [])

  const [selectUser, setSelectUser] = useState<User | null>(null)
  const [perItemList, setPerItemList] = useState<PermissionItem[]>([])

  useEffect(() => {
    if (selectUser) {
      const tables = ["category", "user", "product", "order"]
      let result: PermissionItem[] = [];
      for (let i in tables) {
        let perItem: PermissionItem = {
          title: tables[i],
          read: selectUser.permission?.includes(`${tables[i]}.r`) || selectUser.permission?.includes(`${tables[i]}.*`) || false,
          create: selectUser.permission?.includes(`${tables[i]}.c`) || selectUser.permission?.includes(`${tables[i]}.*`) || false,
          delete: selectUser.permission?.includes(`${tables[i]}.d`) || selectUser.permission?.includes(`${tables[i]}.*`) || false,
          update: selectUser.permission?.includes(`${tables[i]}.u`) || selectUser.permission?.includes(`${tables[i]}.*`) || false
        }
        result.push(perItem)
      }
      setPerItemList(result)
    }

  }, [selectUser])

  function updatePer(type: String, index: number, user: User) {
    let data = perItemList.slice().map((item, i) => {
      if (i == index) {
        let cloneObj = {
          ...item
        };
        (cloneObj as any)[`${type}`] = !(cloneObj as any)[`${type}`];
        return cloneObj;
      }
      return item
    })

    let perTemp = ``;
    for (let i in data) {
      if (data[i].create) {
        perTemp += `${data[i].title}.c,`
      }
      if (data[i].read) {
        perTemp += `${data[i].title}.r,`
      }
      if (data[i].update) {
        perTemp += `${data[i].title}.u,`
      }
      if (data[i].delete) {
        perTemp += `${data[i].title}.d,`
      }
    }

    api.user.update({
      ...user,
      permission: perTemp
    }).then(res => {
      setPerItemList(data)
    })
    console.log("day la user", user)
  }

  const [type, setType] = useState<string>(Role.ADMIN)

  return (
    <>
      Type: <select onChange={(e) => {
        setType(e.target.value)
      }} defaultValue={type}>
        <option value={Role.ADMIN} onClick={() => {
          setType(Role.ADMIN)
        }}>Admin</option>
        <option value={Role.MOD} onClick={() => {
          setType(Role.MOD)
        }}>Moderator</option>
        <option value={Role.USER} onClick={() => {
          setType(Role.USER)
        }}>User</option>
      </select>
      {
        selectUser && (
          <div className='per_box'>
            <div className='per_content'>
              <button onClick={() => {
                setSelectUser(null)
              }} className='btn_close btn btn-danger'>X</button>
              <Table>
                <thead>
                  <tr>
                    <th>* {selectUser.username}</th>
                    <th>Create</th>
                    <th>Read</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    perItemList.map((perItem, index) => {
                      return (
                        <tr key={Date.now() * Math.random()}>
                          <td>{perItem.title}</td>
                          <td>
                            <input onChange={() => {
                              updatePer('create', index, selectUser)
                            }} type="checkbox" defaultChecked={perItem.create} />
                          </td>
                          <td>
                            <input onChange={() => {
                              updatePer('read', index, selectUser)
                            }} type="checkbox" defaultChecked={perItem.read} />
                          </td>
                          <td>
                            <input onChange={() => {
                              updatePer('update', index, selectUser)
                            }} type="checkbox" defaultChecked={perItem.update} />
                          </td>
                          <td>
                            <input onChange={() => {
                              updatePer('delete', index, selectUser)
                            }} type="checkbox" defaultChecked={perItem.delete} />
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        )
      }
      {
        permission.read && (
          <div className='user_manager_box'>
            {/* View */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Avatar</th>
                  <th>Role</th>
                  <th>IsBlocked</th>
                  <th>isVerified</th>
                  <th>createAt</th>
                  <th>updateAt</th>
                  <th>Permisson</th>
                  <th>tools</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.slice().filter(item => item.role == type).map((user, index) => (
                    <tr key={user.id}>
                      <td>{index}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <img src={user.avatarUrl} style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%'
                        }} />
                      </td>
                      <td>
                        {
                          userStore.data?.permission?.includes("user.u") == true ? (
                            <select onChange={(e) => {
                              api.user.update({
                                ...user,
                                role: e.target.value as Role
                              })
                                .then(res => {
                                  setUsers(users.map(item => {
                                    if (item.id == user.id) {
                                      return res.data
                                    }
                                    return item
                                  }))
                                })
                            }} defaultValue={user.role}>
                              <option value={Role.ADMIN}>admin</option>
                              <option value={Role.MOD}>mod</option>
                              <option value={Role.USER}>user</option>
                            </select>
                          ) : user.role
                        }
                      </td>
                      <td>{user.isBlocked ? "cấm" : "hoạt động"}</td>
                      <td>{user.isVerified ? "đã xác thực mail" : "chưa xác thực mail"}</td>
                      <td>{`${new Date(Number(user.createdAt)).getDate()} - ${new Date(Number(user.createdAt)).getMonth() + 1} - ${new Date(Number(user.createdAt)).getFullYear()}`}</td>
                      <td>{user.updatedAt}</td>
                      <td>
                        {
                          userStore.data?.permission?.includes("user.u") == true ? (
                            <button onClick={() => {
                              setSelectUser(user)
                            }}>Manager</button>
                          ) : "Không có quyền truy cập"
                        }
                      </td>
                      <td>
                        {
                          userStore.data?.permission?.includes("user.u") == true || type == Role.USER ? (<button onClick={() => {
                            let updateDate = {
                              ...user,
                              isBlocked: !user.isBlocked
                            }

                            api.user.update(updateDate).then(res => {
                              setUsers(users.map(item => {
                                if (item.id == user.id) {
                                  return res.data
                                }
                                return item
                              }))
                            }).catch(err => {
                              // console.log("err", err)
                            })
                          }} className={`btn btn-${user.isBlocked ? "danger" : "success"}`}>{user.isBlocked ? "unlock" : "block"}</button>) : ""
                        }

                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        )
      }
    </>
  )
};

export default UserTable;