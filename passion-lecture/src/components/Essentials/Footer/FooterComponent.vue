<script setup></script>
<template>
  <footer>
    <p>© ETML - P_Web-294</p>
    <div id="github">
      <img src="@/assets/icons/github-mark-white.svg" alt="Github Icon" />
      <div id="github-accounts">
        <a href="https://github.com/fbrend23" target="_blanck">Brendan Fleurdelys</a>
        <a href="https://github.com/NovaNoctua" target="_blanck">Maël Naudet</a>
        <a href="https://github.com/mina-etml" target="_blanck">Mina Morier</a>
      </div>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: #1c1c1c;
  color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 10px 0px;
}

#github {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
}

#github-accounts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

p {
  font-size: 1.125rem;
}

a {
  color: #fafafa;
  text-decoration: none;
  font-size: 0.9rem;
}

a:hover {
  color: #42d21a;
}

img {
  height: 50px;
  margin: 0px 20px;
}
</style>
