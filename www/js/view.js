/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var view = {

	// Refresh the Items table in the view
    refreshTable: function(response) {
    	clearTable();
    	var items = JSON.parse(response.responseText);
    	for (i in items) {
        	var id = items[i].id;
        	var text = items[i].text;
        	var isDone = items[i].isDone;
        	generateTableRow(id, text, isDone);
    	}
    },

    // Update strike through of item if checked or not OR if clear is set then clear checkbox
    updateItem: function(id, clear) {
		var checkboxID = "todo-item-checkbox-" + id;
        var checked = document.getElementById(checkboxID).checked;

        var inputID = "todo-item-input-" + id;
        var input = document.getElementById(inputID);

        if (checked && !clear) {
            input.className = input.className + " strike";
        }
        else {
            input.className = "form-control";
        }
    },

    // Change Edit button to Save button and enable input
    changeToSave: function(id) {
    	// Change edit to save
		var buttonID = "todo-item-btn-edit-" + id;
        var button = document.getElementById(buttonID);
        button.className = "btn btn-success";
        button.textContent = "Save";
        button.setAttribute('onclick', "app.saveItem(" + id + ")");
        button.id = "todo-item-btn-save-" + id;

        // Enable input
        var inputID = "todo-item-input-" + id;
        var input = document.getElementById(inputID);
        input.disabled = false;
    },

    // Change Save button to Edit button and disable input
    changeToEdit: function(id) {
    	// Change save to edit
    	var buttonID = "todo-item-btn-save-" + id;
        var button = document.getElementById(buttonID);
        button.className = "btn btn-info";
        button.textContent = "Edit";
        button.setAttribute('onclick', "app.editItem(" + id + ")");
        button.id = "todo-item-btn-edit-" + id;

        // Disable input
        var inputID = "todo-item-input-" + id;
        var input = document.getElementById(inputID);
        input.disabled = true;
    }
};

// Clear the table contents
function clearTable() {
	var table = document.getElementsByTagName("tbody")[0];
	table.innerHTML = "";
}

// Generate the HTML for each row of the table
function generateTableRow(id, text, isDone) {
	var table = document.getElementsByTagName("tbody")[0];
	var row = document.createElement("tr");
	row.className = "todo-item-row";

	var html = "";
	var elemID = "";

	// Add Table row
	html += '<td class="todo-item-cell"><div class="input-group"><span class="input-group-addon">';
	elemID = "todo-item-checkbox-" + id;

	// Add Checkbox and set to checked if isDone
	// Add Input and add strike-through class if isDone
	if (isDone) {
		html += '<input id="' + elemID + '" type="checkbox" checked onclick="app.updateItem(' + id + ')">';
		elemID = "todo-item-input-" + id;
		html += '</span><input id="' + elemID + '" type="text" disabled=true class="form-control ' + "strike" + '" value="' + text + '">';
	}
	else {
		html += '<input id="' + elemID + '" type="checkbox" onclick="app.updateItem(' + id + ')">';
		elemID = "todo-item-input-" + id;
		html += '</span><input id="' + elemID + '" type="text" disabled=true class="form-control" value="' + text + '">';
	}

	// Add Buttons
	elemID = "todo-item-btn-edit-" + id;
	html += '<span class="input-group-btn"><button id="' + elemID + '" class="btn btn-info" type="button" onclick="app.editItem(' + id + ')">Edit</button>'
	html += '<button class="btn btn-danger" type="button" onclick="app.deleteItem(' + id + ')">Delete</button></span></div></td>';

	row.innerHTML = html;
	table.appendChild(row);
};
