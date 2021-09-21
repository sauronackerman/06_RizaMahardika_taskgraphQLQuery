import { useState } from "react";
import ListItem from "./ListItem";
import { gql, useLazyQuery } from "@apollo/client";

const getDataListById = gql`
  query MyQuery($id: Int!) {
    anggota(where: { id: { _eq: $id } }) {
      nama
      umur
      jenis_kelamin
    }
  }
`;

// MyQuery($jenis_kelamin: String!) {
//     anggota(where: {jenis_kelamin: {_eq: $jenis_kelamin}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }
//   MyQuery($nama: String!) {
//     anggota(where: {nama: {_eq: $nama}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }
//   MyQuery($umur: Int!) {
//     anggota(where: {umur: {_eq: $umur}}) {
//       nama
//       umur
//       jenis_kelamin
//     }
//   }

const ListPassenger = () => {
  const defaultState = [
    {
      nama: "",
    },
  ];

  const [statedata, setState] = useState(defaultState);

  const [getName, { data, loading, error }] = useLazyQuery(getDataListById);
  const [userId, setUserId] = useState(0);

  // const [option, setOption] = useState('')
  const onChangeUserId = (e) => {
    if (e.target) {
      setUserId(e.target.value);
    }
  };
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Terjadi kesalahan</h3>;
  }

  //   const handleOption = (e) => {
  //     setOption(e.target.value)
  //   }

  const onGetData = () => {
    getName({
      variables: {
        id: userId,
      },
    });
    setState(data?.anggota);
  };
  console.log("user: ", data);

  // const hapusPengunjung = (e) => {
  //   const nama = e.target.getAttribute("nama");
  //   // setState(state.filter((item) =>  item.nama !== nama));
  //   setState(
  //     state.filter((item) => {
  //       return item.nama !== nama;
  //     })
  //   );
  // };

  const hapusPengunjung = () => {
    return true;
  };

  return (
    <div>
      {/* <label htmlFor="choice">Pilih berdasarkan:</label>
<select name="choice" id="choice">
  <option value={userId}>id</option>
  <option value={username}>nama</option>
  <option value={userAge}>umur</option>
  <option value={userGender}>jenis kelamin</option>
</select>  */}
      <input value={userId} onChange={onChangeUserId} />
      <button onClick={onGetData}>Get Data</button>

      {data?.anggota.length === 0 ? (
        <h3>Data tidak ditemukan</h3>
      ) : (
        <table cellPadding="5px" cellSpacing="0" style={{ margin: "auto" }}>
          <thead bgcolor="red">
            <tr>
              <td>Nama</td>
              <td>Umur</td>
              <td>Jenis Kelamin</td>
              <td bgcolor="white" className="removeBorder"></td>
            </tr>
          </thead>
          {data?.anggota.map((item, i) => (
            <ListItem
              key={i}
              id={i}
              data={item}
              hapusPengunjung={hapusPengunjung}
            />
          ))}
        </table>
      )}
    </div>
  );
};

export default ListPassenger;
