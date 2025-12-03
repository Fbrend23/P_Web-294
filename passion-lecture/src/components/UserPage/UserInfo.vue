<script setup>

</script>

<template>
    <div>
        <p>Inscrit depuis: {{ dateInscription }}</p>
        <p>Ouvrages créer: {{ numberOfBooksCreated }}</p>
        <div>
            <p> Dernier ouvrage ajouté</p>
            <img :src="bookImage" alt="Image du dernier ouvrage ajouté">
        </div>
    </div>
</template>

<style></style>