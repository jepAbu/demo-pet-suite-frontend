import React, { useState, useEffect } from 'react'
import useGlobal from '../../services/useGlobal'
import MainLayout from '../../layouts/MainLayout'
import AddForm from '../../wigets/Forms/FormConfig'
import CreateForm from'./CreateForm'
import { Link } from 'react-router-dom'

function Pets({history}) {
	
	const searchState = {
		search: '',
		showCreate: false,
		formCreated: false,
	}

	const [state, setState] = useState(searchState)
	const [gState, gActions] = useGlobal()

	useEffect(() => {
		if(!gState.petsLoaded){
			gActions.getPets()
		}
	})
	
	const tableHeader = [
		{
			title: 'Name',
			key: 'name',
		},
		{
			title: 'Breed',
			key: 'breed',
		},
		{
			title: 'Type',
			key: 'type',
		},
		{
			title: 'Size',
			key: 'size',
		},
		{
			title: 'Owner',
			key: 'owner',
		},
		{
			title: '',
			key: 'actions'
		}
	]

	const tableData = () => {
		if(state.search.legth > 3) {
			return gState.pets.filter(pets => JSON.stringify(pets).search(new RegExp(state.search, 'ig')) > -1)
		}
		return gState.pets
	}

	const petOption = (
		<div className='btn-option'>
			<span className="btn btn-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i className="fas fa-caret-down"></i>
			</span>
			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
				<button className='dropdown-item options btn-sm'>Edit</button>
				<div className="dropdown-divider"></div>
				<form>
					<button className="dropdown-item options btn-sm" type='submit' >Delete</button>
				</form>	
			</div>
		</div>
	)

	const showForm = () => {
		setState({...state, showCreate: true, formCreated: true})
	}

	return (
		<MainLayout history={history}>
				{state.showCreate ?
				<div className={`${state.showCreate && state.formCreated ? "d-block" : "d-none"}`}>
					<AddForm title="Add Pet" state={state} setState={setState}>
						<CreateForm formClose={setState} />
					</AddForm>
				</div>
				:
				null
			}

			<div className="filters">
				<div className="row">
					<div className="col">
						<div className="bg-light rounded rounded-pill shadow-sm">
							<div className="input-group search">
								<input type="search" placeholder="What're you searching for?" aria-describedby="button-search" className="form-control border-0 bg-light"/>
								<div className="input-group-append">
									<button id="button-seacrh" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
								</div>
							</div>
						</div>
					</div>
					<div className="col input-group d-flex justify-content-end">
						<button className='btn btn-primary btn-sm' onClick={showForm}>
							<i className="fas fa-plus-circle mr-1"></i>Add Pet
						</button>
					</div>
				</div>
			</div>
			
			<div className="records">
				<div className="record-header">
					<div className="breadcrumb">
						Breadcrumb
					</div>
					<span className="record-title">
						Pets
					</span>
					{' '}
					<span className="record-subtitle small">
						Manage All Pet
					</span>
				</div>

				<div className="card">
					<div className="card-body">
						<div className='table-border shadow-sm'>
							<table className='table record-table table-sm table-hover'>
								<thead>
									<tr>
										{tableHeader.map(header => (
											<th key={header.key}>{header.title}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{tableData().map(pet => (
										<tr key= {pet._id}>
											<td>{pet.name}</td>
											<td>{pet.breed}</td>
											<td>{pet.type}</td>
											<td>{pet.size}</td>
											{pet.owner !== null ? <td>{pet.owner.firstname} {pet.owner.lastname}</td> : <td></td>}
											<td>{petOption}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className='table-footer'>
							<nav arial-label="d-flex Page Navigationn example" >
								<ul className="pagination justify-content-end">
									<li className="page-item">
										<Link to='#' className='page-link' aria-label="Previous">
											<span aria-hidden='true'>&laquo;</span>
											<span className='sr-only'>Previous</span>
										</Link>
									</li>
									<li className="page-item">
										<Link to='#' className='page-link'>1</Link>
									</li>
									<li className="page-item">
										<Link to='#' className='page-link'>2</Link>
									</li>
									<li className="page-item">
										<Link to='#' className='page-link' aria-label="Next">
											<span aria-hidden='true'>&raquo;</span>
											<span className='sr-only'>Next</span>
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default Pets
