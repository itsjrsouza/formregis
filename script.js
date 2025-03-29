// Função para preencher automaticamente o endereço com base no CEP
document.getElementById('cep').addEventListener('blur', function() {
    let cep = document.getElementById('cep').value;
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado.");
                } else {
                    document.getElementById('street').value = data.logradouro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.uf;
                }
            })
            .catch(error => alert("Erro ao buscar CEP."));
    }
});

// Função para salvar os dados no Web Storage
const saveDataToLocalStorage = () => {
    const studentData = {
        fullname: document.getElementById('fullname').value,
        birth: document.getElementById('birth').value,
        gender: document.getElementById('gender').value,
        medicalInfo: document.getElementById('medical-info').value,
        cep: document.getElementById('cep').value,
        street: document.getElementById('street').value,
        number: document.getElementById('number').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        guardian: document.getElementById('guardian').value,
        phone: document.getElementById('phone').value,
        mail: document.getElementById('mail').value,
        studyShift: document.querySelector('input[name="study-shift"]:checked')?.value,
        sport: document.querySelector('input[name="sport"]:checked')?.id
    };
    
    localStorage.setItem('studentData', JSON.stringify(studentData));
};

// Função para recuperar os dados do Web Storage
const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
        const studentData = JSON.parse(savedData);
        
        document.getElementById('fullname').value = studentData.fullname;
        document.getElementById('birth').value = studentData.birth;
        document.getElementById('gender').value = studentData.gender;
        document.getElementById('medical-info').value = studentData.medicalInfo;
        document.getElementById('cep').value = studentData.cep;
        document.getElementById('street').value = studentData.street;
        document.getElementById('number').value = studentData.number;
        document.getElementById('city').value = studentData.city;
        document.getElementById('state').value = studentData.state;
        document.getElementById('guardian').value = studentData.guardian;
        document.getElementById('phone').value = studentData.phone;
        document.getElementById('mail').value = studentData.mail;
        
        if (studentData.studyShift) {
            document.querySelector(`input[name="study-shift"][value="${studentData.studyShift}"]`).checked = true;
        }

        if (studentData.sport) {
            document.getElementById(studentData.sport).checked = true;
        }
    }
};

// Função para cadastrar aluno na API do CrudCrud
const registerStudent = () => {
    const studentData = {
        fullname: document.getElementById('fullname').value,
        birth: document.getElementById('birth').value,
        gender: document.getElementById('gender').value,
        medicalInfo: document.getElementById('medical-info').value,
        cep: document.getElementById('cep').value,
        street: document.getElementById('street').value,
        number: document.getElementById('number').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        guardian: document.getElementById('guardian').value,
        phone: document.getElementById('phone').value,
        mail: document.getElementById('mail').value,
        studyShift: document.querySelector('input[name="study-shift"]:checked')?.value,
        sport: document.querySelector('input[name="sport"]:checked')?.id
    };
    
    fetch('https://crudcrud.com/api/7900ee8f9a2a430084da4d839a6ba05d/students/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Aluno cadastrado com sucesso!');
    })
    .catch(error => {
        alert('Erro ao cadastrar aluno.');
        console.error(error);
    });
};

// Função para listar alunos da API do CrudCrud
const listStudents = () => {
    fetch('https://crudcrud.com/api/7900ee8f9a2a430084da4d839a6ba05d/students/')
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('student-list');
            studentList.innerHTML = '';
            data.forEach(student => {
                const studentItem = document.createElement('li');
                studentItem.textContent = `${student.fullname} - ${student.city}`;
                studentList.appendChild(studentItem);
            });
        })
        .catch(error => {
            alert('Erro ao listar alunos.');
            console.error(error);
        });
};

// Função para excluir aluno da API do CrudCrud
const deleteStudent = (id) => {
    fetch(`https://crudcrud.com/api/7900ee8f9a2a430084da4d839a6ba05d/students/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Aluno excluído com sucesso!');
            listStudents();  // Recarregar a lista após exclusão
        } else {
            alert('Erro ao excluir aluno.');
        }
    })
    .catch(error => {
        alert('Erro ao excluir aluno.');
        console.error(error);
    });
};

// Evento de salvar ao clicar no botão de salvar
document.querySelector('.btn-secondary').addEventListener('click', saveDataToLocalStorage);

// Evento de cadastro de aluno ao submeter o formulário
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    registerStudent();
});
