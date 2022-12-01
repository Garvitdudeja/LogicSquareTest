import React, { useState, useEffect } from 'react';
import { Nav, Container, Navbar, Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import { BsPlusLg, BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

function MyVerticallyCenteredModal(props) {

    const empData = props.empData;
    const oldData = props.oldData;
    const [data, setData] = useState({})

    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const storeData = () => {
        props.onHide()
        empData([{...data,id:Date.now().toString(),Available: false},...oldData])
        props.setTotal(prev=>prev+1)
        console.log(oldData);
        localStorage.setItem('LSData', JSON.stringify([{...data,id:Date.now().toString(),Available: false},...oldData]))
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter" name='Name' onChange={handleChange}  />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select aria-label="Default select example" name='Gender' onChange={handleChange} >
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="Number" placeholder="Enter" name='Age' onChange={handleChange}  />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control type="text" placeholder="Enter" name='Designation' onChange={handleChange}  />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" placeholder="Enter" name='Department' onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Joining Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter" name='Joining Date' onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props.onHide}>Cancel</Button>
                <Button variant='success' onClick={storeData} >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}




function Signin() {
    const [modalShow, setModalShow] = useState(false);
    const [Available, setAvailable] = useState(10);
    const [Total, setTotal] = useState(10);
    const [employeeData, setEmployeeData] = useState([]);


    useEffect(() => {
        const getData = () => {
            let data=JSON.parse(localStorage.getItem('LSData'))
            let x=0
            setTotal(data.length)
            for(let i=0; i<data.length; i++) {
                if (data[i].Available==true){
                    x+=1
                }
            }   
            setAvailable(x)
            setEmployeeData(data)
        };
        getData();
    }, [])

    const deleteEmployee = (e) => {
        for(let i=0; i<employeeData.length; i++) {
            if (employeeData[i].id===e.target.id && employeeData[i].Available==true){
                setAvailable(prev=>prev-1)
            }
        }

        setEmployeeData(employeeData.filter(item => item.id != e.target.id))
        setTotal(prev => prev - 1)
        console.log(employeeData)
        localStorage.setItem('LSData', JSON.stringify(employeeData.filter(item => item.id != e.target.id)))
        
    }
    const changeAvailable = (e) => {
        if (e.target.value==="true"){
            setEmployeeData(employeeData.map(item=>item.id===e.target.id ? {...item,Available:false}:item))
            setAvailable(prev=>prev-1)
        }
        else{
            setEmployeeData(employeeData.map(item=>item.id===e.target.id ? {...item,Available:true}:item))
            setAvailable(prev=>prev+1)
        }
    }
    return (
        <>

            {/* Navbar */}

            <Navbar bg="light" expand="lg">
                <Container className="justify-end">
                    <Navbar.Brand href="#home">
                        <img src="https://res.cloudinary.com/www-logic-square-com/image/upload/v1551945805/ls-logo.png" alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className=''>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Page Name</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='border p-2 m-2'>
                <h5>Available: {Available} </h5>
                <h5>Total: {Total}</h5>


                
                {/* Add Member Modal */}


                <Button variant="primary" onClick={() => setModalShow(true)}>
                    <BsPlusLg /> Add Employee
                </Button>

                <MyVerticallyCenteredModal
                    empData={setEmployeeData}
                    oldData={employeeData}
                    show={modalShow}
                    setTotal={setTotal}
                    onHide={() => setModalShow(false)}
                />
            </div>


            <div className='m-2'>
                <Table bordered hover >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Deaprtment</th>
                            <th>Available</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((each) => {
                            return (<>
                                <tr>
                                    <td>{each.Name}</td>
                                    <td>{each.Department}</td>
                                    <td><Form.Check aria-label="option 1" id={each.id} value={each.Available} checked={each.Available} onClick={changeAvailable} /></td>
                                    <td>
                                        <Button variant="outline-primary" className='mx-2' > <FaEdit />Edit</Button>
                                        <Button variant="outline-danger" id={each.id} onClick={deleteEmployee}> <BsTrash />Delete</Button>
                                    </td>
                                </tr>
                            </>)
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Signin