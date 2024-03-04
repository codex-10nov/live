(function () {
    let ws;
    const wsSend = document.getElementById('ws-send');
    const wsEdit = document.getElementById('ws-edit');
    const wsInputTitle = document.getElementById('ws-input-title');
    const wsInputContent = document.getElementById('ws-input-content');

    ws = new WebSocket('ws://localhost:3000');

    ws.addEventListener('error', () => {
        // showMessage('WebSocket error');
    });

    ws.addEventListener('open', () => {
        // showMessage('WebSocket connection established');
    });

    ws.addEventListener('close', () => {
        // showMessage('WebSocket connection closed');
    });

    ws.addEventListener('message', (msg) => {
        console.log('Dekho', msg);
        fetchData();
    });


    fetchData();

    function showMessage(messages) {
        const myTableBody = document.getElementById("my-table-body");
        const myTable = document.getElementById("my-table");
    
        // Clear existing content of the table body
        myTableBody.innerHTML = '';
    
        for (let i = 0; i < messages.length; i++) {
            // create a table row element
            let tableRow = document.createElement('tr');
    
            // create table cells for title and content
            let listItemNumber = document.createElement('td');
            let listItemTitle = document.createElement('td');
            let listItemContent = document.createElement('td');
            
            // create table cells for edit and delete buttons
            let editButtonCell = document.createElement('td');
            let deleteButtonCell = document.createElement('td');
    
            // create edit and delete buttons
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            
            // set button labels and attributes
            editButton.innerText = 'Edit';
            deleteButton.innerText = 'Delete';
            editButton.classList.add('editButton');
            deleteButton.classList.add('deleteButton');

            editButton.style.backgroundColor = '#B5C0D0';
            deleteButton.style.backgroundColor = '#EE4266';
    
            // add event listeners for edit and delete buttons
            editButton.addEventListener('click', function() {
                // handle edit button click (add your edit logic here)
                editReview(messages[i]);
                console.log('Edit button clicked for row ' + i);
            });
    
            deleteButton.addEventListener('click', function() {
                // handle delete button click (add your delete logic here)
                deleteReview(messages[i]._id);
                console.log('Delete button clicked for row ' + messages[i]._id);
            });
    
            // add content to table cells
            listItemNumber.innerHTML = i + 1;
            listItemTitle.innerHTML = messages[i].title;
            listItemContent.innerHTML = messages[i].content;
    
            // append table cells to table row
            tableRow.appendChild(listItemNumber);
            tableRow.appendChild(listItemTitle);
            tableRow.appendChild(listItemContent);
            tableRow.appendChild(editButtonCell);
            tableRow.appendChild(deleteButtonCell);
    
            // append buttons to button cells
            editButtonCell.appendChild(editButton);
            deleteButtonCell.appendChild(deleteButton);
    
            // append table row to table body
            myTableBody.appendChild(tableRow);
        }
    
        // Show or hide the table based on the presence of data
        if (messages.length > 0) {
            myTable.style.display = 'table';
        } else {
            myTable.style.display = 'none';
        }
    }    

    function deleteReview(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };

          fetch(`http://localhost:3000/${id}`, requestOptions)
            .then(response => {
                ws.send("deleted");
                return response.json();
            })
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error
            })
    }

    function fetchData() {
        fetch("http://localhost:3000/reviews")
            .then(response => response.json())
            .then(data => {
                showMessage(data);
            })
            .catch(error => {
                console.error
            })
    }


    function editReview(data) {
        wsInputTitle.value = data.title;
        wsInputContent.value = data.content;
        wsSend.style.display = 'none';
        wsEdit.style.display = 'inline-block';
        wsEdit.addEventListener('click', () => {
            console.log('Edit button clicked', data);
            if (!ws) {
                return;
            }
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: wsInputTitle.value,
                    content: wsInputContent.value
                }),
            };
    
            fetch(`http://localhost:3000/${data._id}`, requestOptions)
                .then(response => {
                    ws.send("edited");
                    wsInputTitle.value = '';
                    wsInputContent.value = '';
                    wsEdit.style.display = 'none';
                    wsSend.style.display = 'inline-block';
                })
                .catch(error => {
                    console.error
                })
        })
    }


    wsSend.addEventListener('click', () => {
        const title = wsInputTitle?.value;
        const content = wsInputContent?.value;

        if (!title || !ws) {
            return;
        } 

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
          };

          fetch("http://localhost:3000", requestOptions)
            .then(response => {
                ws.send(title);
                // showMessage(`Sent "${title}"`);
                wsInputTitle.value = '';
                wsInputContent.value = '';
                return response.json();
            })
            .then(data => {
                outputElement.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error
            })

    });
})();