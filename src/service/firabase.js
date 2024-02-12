const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function getProjects () {
  const projectsCol = await collection(db, 'projects')
  const projectSnapshot = await getDocs(projectsCol)
  const projectList = projectSnapshot.docs.map((doc) => doc.data())
  return projectList
}

async function getCurriculum () {
  const curriculumCol = await collection(db, 'curriculum')
  const curriculumSnapshot = await getDocs(curriculumCol)
  const curriculumList = curriculumSnapshot.docs.map((doc) => doc.data())
  return curriculumList
}

module.exports = { getProjects, getCurriculum }
