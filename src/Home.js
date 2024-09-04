import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Home.css';

Modal.setAppElement('#root');

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [skillOptions, setSkillOptions] = useState([]);

  // Simular carregar skills do "backend"
  useEffect(() => {
    // Dados simulados para skills
    const initialSkills = [
      { id: 1, name: 'JavaScript', level: 'Expert', description: 'Programming language', imageUrl: 'https://via.placeholder.com/50' },
      { id: 2, name: 'React', level: 'Intermediate', description: 'JavaScript library', imageUrl: 'https://via.placeholder.com/50' }
    ];
    setSkills(initialSkills);
    
    // Dados simulados para opções de skills
    const options = [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React' },
      { id: 3, name: 'Node.js' }
    ];
    setSkillOptions(options);
  }, []);

  const handleAddSkill = () => {
    setModalIsOpen(true);
  };

  const handleSaveSkill = () => {
    const newSkillObject = {
      id: skills.length + 1, // Simulação de novo ID
      name: newSkill,
      level,
      description,
      imageUrl: 'https://via.placeholder.com/50' // Imagem simulada
    };

    setSkills([...skills, newSkillObject]);
    setModalIsOpen(false);
    setNewSkill('');
    setLevel('');
    setDescription('');
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleLogout = () => {
    // Simular o logout, na prática, poderia limpar o localStorage ou algo semelhante
    alert('Logout realizado com sucesso!');
    window.location.href = '/login';
  };

  return (
    <div className="home-container">
      <div className="home-buttons">
        <button onClick={handleAddSkill}>Adicionar Skill</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ul className="skill-list">
        {skills.map(skill => (
          <li key={skill.id}>
            <img src={skill.imageUrl} alt={skill.name} />
            <input
              type="text"
              value={skill.level}
              onChange={(e) => {
                const updatedSkills = skills.map(s =>
                  s.id === skill.id ? { ...s, level: e.target.value } : s
                );
                setSkills(updatedSkills);
              }}
            />
            <span>{skill.name}</span>
            <button onClick={() => handleDeleteSkill(skill.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Adicionar Skill</h2>
        <label>
          Skill:
          <select
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          >
            <option value="">Selecione uma skill</option>
            {skillOptions.map(option => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Nível:
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSaveSkill}>Salvar</button>
        <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default Home;
