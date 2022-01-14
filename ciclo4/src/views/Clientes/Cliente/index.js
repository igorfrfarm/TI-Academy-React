import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cliente = (props) => {

    const [pedidos, setPedidos] = useState([]);
    const [compras, setCompras] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [id] = useState(props.match.params.id);

    const getCliente = async () => {
        await axios.get(api + "/clientes/" + id)
            .then((response) => {
                setPedidos(response.data.cli.pedidos);  
                setCompras(response.data.cli.compras);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Pedidos e Compras do cliente</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/clientes"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Clientes
                        </Link>
                        <Link
                            to="/pedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Pedidos
                        </Link>
                    </div>
                </div>
                
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.data}</td>
                                <td className="text-center">
                                    <Link
                                        to={"/pedidos/" + item.id}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra ID</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.data}</td>
                                <td className="text-center">
                                    <Link
                                        to={"/compras/" + item.id}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};