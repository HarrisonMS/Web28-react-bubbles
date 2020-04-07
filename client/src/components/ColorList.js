import React, { useState } from "react";
import axiosWithAuth  from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [ addColor, setAddColor ] = useState({
    color: '',
    code : {
      hex: ''
    }
  });
console.log(addColor)
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`,colorToEdit)
    .then((res) => {
      updateColors([...colors.filter((color) => color.id !== colorToEdit), res.data])
      setEditing(!editing)
      axiosWithAuth()
      .get('/api/colors')
      .then((res) => updateColors(res.data))
    })
    .catch((err) => console.log(err));
  };

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then((res) => updateColors(colors.filter((color) => color.id !== res.data)))
			.catch((err) => console.log(err));
  };
  
  const postColor = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post('./api/colors', addColor)
    .then((res) => {
      axiosWithAuth()
      .get('/api/colors')
      .then((res) => updateColors(res.data))
    })
    .catch((err) => console.log(err));
    setAddColor(initialColor)
  }

  const handleChanges = e => {
    setAddColor({
      ...addColor,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span style={{ color: color.code.hex }}>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span >{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={postColor}>
        <input 
        type='text' 
        name='color' 
        value={addColor.color} 
        onChange={handleChanges} 
        placeholder='Color Name' />
				<input
					type='text'
					name='code'
					value={addColor.code.hex}
					onChange={handleChanges} 
					placeholder='Hex Code'
				/>
				<button>Add Color</button>
			</form>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
