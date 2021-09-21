import "./Home.css";
const ListItem = (props) => {
  const { nama, umur, jenis_kelamin } = props.data;

  return (
    <tr>
      <td>{nama}</td>
      <td>{umur}</td>
      <td>{jenis_kelamin}</td>
      <td className="removeBorder" onClick={() => props.hapusPengunjung()}>
        <button>Hapus</button>
      </td>
    </tr>
  );
};

export default ListItem;
