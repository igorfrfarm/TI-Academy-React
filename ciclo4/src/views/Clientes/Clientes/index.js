import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Clientes = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/clientes")
            .then((response) => {
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const excluirCliente = async(id) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + "/clientes/" + id + "/excluir", {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: response.data.message
            });
            getClientes();
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API.'
            });
        });
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Clientes</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/clientes/cadastrar"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Cadastrar cliente
                        </Link>
                    </div>                 
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Cliente ID</th>
                            <th className="text-center">Nome</th>
                            <th className="text-center">Endereço</th>
                            <th className="text-center">Cidade</th>
                            <th className="text-center">UF</th>
                            <th className="text-center">Nascimento</th>
                            <th className="text-center">Cliente desde</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.nome}</td>
                                <td className="text-center">{item.endereco}</td>
                                <td className="text-center">{item.cidade}</td>
                                <td className="text-center">{item.uf}</td>
                                <td className="text-center">{item.nascimento}</td>
                                <td className="text-center">{item.clienteDesde}</td>
                                <td className="d-flex justify-content-center">
                                    <Link
                                        to={"/clientes/" + item.id}
                                        className="btn btn-outline-primary btn-sm mx-1"
                                    >
                                        Consultar
                                    </Link>
                                    <Link
                                        to={"/clientes/" + item.id + "/editar"}
                                        className="btn btn-outline-warning btn-sm mx-1"
                                    >
                                        Editar
                                    </Link>
                                    <span                                        
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => excluirCliente(item.id)}
                                    >
                                        Excluir
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};