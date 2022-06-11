import { useEffect, useState } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';


function ProjectForm ({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState ([])
    const [project, setProject] = useState(projectData || {})
    const userToken = '62a4be785cb18ac2b0cad916'
    sessionStorage.setItem('userToken', userToken)

    useEffect(() => {     
        fetch('https://project-api-manager.herokuapp.com/categories',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('userToken')   
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => {
            console.log(err)
            console.log('poxa vda')
        })
        
    }, [])



    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
     
    }
    

    function handleChange(e) {

        setProject({ ...project, [e.target.name]: e.target.value})
     
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
      
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do Projeto" handleOnChange={handleChange} value={project.name ? project.name : ''} required/> 
            <Input type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento total"  handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
            <Select name="category_id" text="Selecione uma Categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            <SubmitButton type="submit" text={btnText}/>
        </form>
    )
}

export default ProjectForm;