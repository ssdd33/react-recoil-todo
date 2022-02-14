export default function TodoFilter({ onChange }) {
  const handleOnChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <select onChange={handleOnChange}>
        <option value={"all"}>all</option>
        <option value={"complete"}>complete</option>
        <option value={"uncomplete"}>uncomplete</option>
      </select>
    </div>
  );
}
