import updateUserWord from '../api/updateUserWord';
import getUserWord from '../api/getUserWord';

const createArrayWords = (wordId) => {

    getUserWord(wordId).then((el) => {
        updateUserWord({
            wordId: wordId,
            word: {
                "difficulty": "hard", "optional": {
                    'word': el.optional.word,
                    'currentDate': new Date().toISOString().split('T')[0], 'repeatDate': new Date().toISOString().split('T')[0],
                    'repeat': 1,
                }
            },
        });
    })

}

export { createArrayWords as default };