import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import { useNavigate } from 'react-router-dom';

function GroupForm() {
const [groupName, setGroupName] = useState('');
const [groupDescription, setGroupDescription] = useState('');
const [groupRules, setGroupRules] = useState('');
const [groupType, setGroupType] = useState('');
const {user} = useSelector(state => state.auth);
const history = useNavigate()
const dispatch= useDispatch()
const handleSubmit = async (event) => {
event.preventDefault(); // Ngăn chặn trình duyệt submit form
try {
const response = await postDataAPI('groups/create', {
name: groupName,
description: groupDescription,
rules: groupRules,
moderatorId:user._id
});
dispatch({type: GLOBALTYPES.ALERT, payload: {success:  "Created!"}})
history('/search/groups');
} catch (error) {
dispatch({type: GLOBALTYPES.ALERT, payload: {error:  error.response.data.message}})
console.error(error);
}
};
return (
<div className="max-w-2xl mx-auto my-8">
<h2 className="text-3xl font-bold mb-4">Create a New Group</h2>
<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="group-name">
Group Name
</label>
<input
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="group-name"
type="text"
placeholder="Enter group name"
value={groupName}
onChange={(event) => setGroupName(event.target.value)}
/>
</div>
<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="group-description">
Group Description
</label>
<textarea
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="group-description"
placeholder="Enter group description"
rows="5"
value={groupDescription}
onChange={(event) => setGroupDescription(event.target.value)}
/>
</div>
<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2" htmlFor="group-rules">
Rules
</label>
<textarea
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="group-rules"
placeholder="Enter group rules"
rows="5"
value={groupRules}
onChange={(event) => setGroupRules(event.target.value)}
/>
</div>
<div className="flex items-center justify-between">
<button
         className="bg-purple hover:bg-faint-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit"
         onClick={handleSubmit}
       >
Create Group
</button>
</div>
</form>
</div>
);
}

export default GroupForm;