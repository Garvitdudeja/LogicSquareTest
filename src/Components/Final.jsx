import React, { useState, useEffect } from 'react';
import { Nav, Container, Navbar, Button, Modal, Table, Form, Row, Col } from 'react-bootstrap';
import { BsPlusLg, BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

function MyVerticallyCenteredModal(props) {

    const empData = props.empData;
    const oldData = props.oldData;
    const [data, setData] = useState({ Gender: "Male" })
    const [validated, setValidated] = useState(false);


    const handleChange = (e) => {
        console.log({ ...data, [e.target.name]: e.target.value })
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.checkValidity() === true) {
            event.preventDefault();
            let x = [{ ...data, id: Date.now().toString(), Available: false }, ...oldData];
            empData(x)
            props.setTotal(prev => prev + 1)
            console.log(oldData);
            localStorage.setItem('LSData', JSON.stringify(x))
            props.onHide()
        }


        setValidated(true);
    };



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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="Name"
                                required
                                type="text"
                                placeholder="John, Joseph, ..."
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                required
                                name="Gender"
                                defaultValue="Male"
                                onChange={handleChange}
                            >
                                <option>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                required
                                name="Age"
                                type="number"
                                placeholder="Enter"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                required
                                name="Designation"
                                type="text"
                                placeholder="Enter designation"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row><Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name='Department'
                                required
                                type="text"
                                placeholder="Enter Department"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Joining Date</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                required
                                name="JoiningDate"
                                type="date"
                                placeholder="Last name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={props.onHide}>Cancel</Button>
                    <Button type="submit" variant='success' >Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const EditEmpModal = (props) => {

    const empData = props.empData;
    const oldData = props.oldData;
    const empId = props.empId;
    const [data, setData] = useState(oldData.filter((item) => item.id === empId)[0] ? oldData.filter((item) => item.id === empId)[0] : {});

    console.log(empId);
    console.log(data);
    useEffect(() => {
        setData(oldData.filter((item) => item.id === empId)[0] ? oldData.filter((item) => item.id === empId)[0] : {})
    }, [empId, oldData])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const storeData = () => {
        props.onHide()
        let newData = oldData.map((item) => {
            if (item.id === empId) {
                return data
            }
            else return item
        })
        empData(newData)
        localStorage.setItem('LSData', JSON.stringify(newData))
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
                                    <Form.Control type="text" placeholder="Enter" name='Name' value={data.Name ? data.Name : ""} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select aria-label="Default select example" name='Gender' value={data.Gender ? data.Gender : ""} onChange={handleChange} >
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
                                    <Form.Control type="Number" placeholder="Enter" name='Age' value={data.Age ? data.Age : ""} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control type="text" placeholder="Enter" name='Designation' value={data.Designation ? data.Designation : ""} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" placeholder="Enter" name='Department' value={data.Department ? data.Department : ""} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Joining Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter" name='JoiningDate' value={data.JoiningDate ? data.JoiningDate : ""} onChange={handleChange} />
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



function Final() {
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [Available, setAvailable] = useState(10);
    const [Total, setTotal] = useState(10);
    const [employeeData, setEmployeeData] = useState([]);
    const [editEmpId, setEditEmpId] = useState(null);


    useEffect(() => {
        const getData = () => {
            let data = [];
            if (localStorage.getItem('LSData') === null) {
                localStorage.setItem('LSData', employeeData);
            }
            else {
                data = JSON.parse(localStorage.getItem('LSData'));
            }
            let x = 0
            setTotal(data.length)
            for (let i = 0; i < data.length; i++) {
                if (data[i].Available === true) {
                    x += 1
                }
            }
            setAvailable(x)
            setEmployeeData(data)
        };
        getData();
    }, [])

    const deleteEmployee = (e) => {
        for (let i = 0; i < employeeData.length; i++) {
            if (employeeData[i].id === e.target.id && employeeData[i].Available == true) {
                setAvailable(prev => prev - 1)
            }
        }

        setEmployeeData(employeeData.filter(item => item.id != e.target.id))
        setTotal(prev => prev - 1)
        console.log(employeeData)
        localStorage.setItem('LSData', JSON.stringify(employeeData.filter(item => item.id != e.target.id)))

    }
    const changeAvailable = (e) => {
        
        let x = employeeData.map(item=> item.id === e.target.id ? {...item, Available: !item.Available}: item)
        setEmployeeData(x);
        localStorage.setItem('LSData', JSON.stringify(x));




        if (e.target.value === "true") {
            setEmployeeData(employeeData.map(item => item.id === e.target.id ? { ...item, Available: false } : item))
            setAvailable(prev => prev - 1)
        }
        else {
            setEmployeeData(employeeData.map(item => item.id === e.target.id ? { ...item, Available: true } : item))
            setAvailable(prev => prev + 1)
        }
    }

    const handleEdit = (id) => {
        setEditEmpId(id);
        setEditModalShow(true);
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
                <EditEmpModal
                    empData={setEmployeeData}
                    oldData={employeeData}
                    show={editModalShow}
                    empId={editEmpId}
                    onHide={() => setEditModalShow(false)}
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
                                        <Button variant="outline-primary" className='mx-2' onClick={() => handleEdit(each.id)} > <FaEdit />Edit</Button>
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

export default Final
