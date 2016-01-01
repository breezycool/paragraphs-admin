import {expect} from 'chai'

// NOTE: this was amateur - I should only be testing the
// 			 paragraphs reducer here, not the whole store.
import {configureStore} from '../redux/store'
import {toggleEdit, saveText, addParagraph, addHints, toggleParagraphType,
	removeParagraph, saveHintTags, hardDeleteHint, saveHintText} from '../redux/actions'

let paragraphStore
describe('paragraphs reducer', () => {

	beforeEach(() => {
		const initialState = [
			{id: 0, isEditing: false, isBadText: true, badText: "my study of history is falling apart. i haven’t concerned myself with it since i was kicked out of st johns for sleeping in the library. i haven’t been able to bring myself to be concerned with it through the web. i spend most of my day looking through this screen, trying to find something worthwhile, and looking for history online seems distracted from what history is supposed to stand for; a referential tomb, for authority of thought and practice.", improvedText: "this is improved text!!!!", hintTags: []},
			{id: 1, isEditing: false, isBadText: true, badText: "in where i find myself financially, i ought not to buy history books. i visited the vatican museums with coworkers earler today, and was inadvertently reprimanded by our boss and tour guide for prioritising atmospheric humour atop of the legitimate study of authoritative art. i think i have faith in the cards i played; but this could well be because i don’t know as much about art as my coworkers. reductive humour may be my ego’s appeal to inferior knowledge. with the piece of mind i have of theirs, it is hard to be persuaded by inanimate statues, no matter how naturalised are their opposite limbs. how can coffee with deceptive me be less dynamic than a ruptured torso?", improvedText: "this is improved text!!!!", hintTags: []},
			{id: 2, isEditing: false, isBadText: true, badText: "my study of history is falling apart. i have taken to re-reading chapters, and meditating in a moving bathroom to avoid the train’s ticket officer. i am reading about a new immobile model-view-controller approach, renovating the design of large-scale applications by reconceptualising dom insertions, deletes and updates as a complete re-rendering of the application state. as far as i can tell, this has nothing to do with the expansion of civilisation in southern asia. the perspective from which we as the reader know that jon snow must be some sort of metamorph, to inhabit ghost’s habits as he sleeps, and yet cannot know that his brother brandon is still alive, in the coat and fur of his own direwolf, also cannot be said to be history. the monuments in the vatican museum are the closest that i have come to studying history, but i laughed and longed for food through most of that walking.", improvedText: "this is improved text!!!!", hintTags: []}
		]
		let initial = {
			paragraphs: initialState, hints: []
		}
		paragraphStore = configureStore(initial)
	})

	it('includes the paragraphs reducer', () => {
		let state = paragraphStore.getState()
		expect(state).to.be.instanceOf(Object)
		expect(state).to.include.keys(['paragraphs'])
	})

	it('handles TOGGLE_EDIT action', () => {
		paragraphStore.dispatch(toggleEdit(0))
		let state = paragraphStore.getState()
		expect(state.paragraphs[0]).to.contain({isEditing: true})
	})

	it('handles TOGGLE_PARAGRAPH_TYPE action', () => {
		paragraphStore.dispatch(toggleParagraphType(0))
		let state = paragraphStore.getState()
		expect(state.paragraphs[0]).to.contain({isBadText: false})
	})

	it('handles SAVE_TEXT action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(saveText('new text', 0))
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength)
		expect(state.paragraphs[0].badText).to.equal('new text')
	})

	it('handles ADD_PARAGRAPH action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(addParagraph())
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength + 1)
	})

	it('handles REMOVE_PARAGRAPH action', () => {
		let state = paragraphStore.getState()
		let originalLength = state.paragraphs.length
		paragraphStore.dispatch(addParagraph())
		paragraphStore.dispatch(removeParagraph(1))
		state = paragraphStore.getState()
		expect(state.paragraphs.length).to.equal(originalLength)
	})

	describe('SAVE_HINT_TAGS action', () => {
		it('works with one hint', () => {
			let state = paragraphStore.getState()
			let originalLength = state.hints.length

			paragraphStore.dispatch(addParagraph())
			let paragraphId = state.paragraphs.length // due to 0 indexing
			let hintToSave = ['newly added hint']
			paragraphStore.dispatch(saveHintTags(paragraphId, hintToSave))

			state = paragraphStore.getState()
			let hintTags = state.paragraphs[paragraphId].hintTags
			expect(hintTags[hintTags.length - 1]).to.contain('newly added hint')
		})

		it('works with 100 hints', () => {
			let state = paragraphStore.getState()
			let originalLength = state.hints.length

			paragraphStore.dispatch(addParagraph())
			let paragraphId = state.paragraphs.length // due to 0 indexing
			let hintsToSave = []
			for (var i = 0; i < 100; i++) {
				hintsToSave.push('hint '+i)
			}
			paragraphStore.dispatch(saveHintTags(paragraphId, hintsToSave))

			state = paragraphStore.getState()
			let hintTags = state.paragraphs[paragraphId].hintTags
			expect(hintTags.length).to.be.above(99)
			hintTags.map((hint, index) => {
				expect(hint).to.contain('hint '+(index))
			})
		})

		it('should replace hints already in store', () => {
      let state = paragraphStore.getState()
      let originalLength = state.paragraphs[0].hintTags.length
      paragraphStore.dispatch(saveHintTags(0, ['ZOMBIE NOUN', 'second tag']))
			paragraphStore.dispatch(saveHintTags(0, ['third tag', 'fourth tag']))

      state = paragraphStore.getState()
      expect(state.paragraphs[0].hintTags).to.have.length(2) // existing is overridden
      expect(state.paragraphs[0].hintTags).to.contain('third tag')
			expect(state.paragraphs[0].hintTags).to.contain('fourth tag')
		})

		it('should remove duplicates in array sent from component', () => {
			let state = paragraphStore.getState()
      let hintTagsToAdd = ['ZOMBIE NOUNZ', 'ZOMBIE NOUNZ', 'ZOMBIE NOUNS']
      paragraphStore.dispatch(saveHintTags(0, hintTagsToAdd))
      state = paragraphStore.getState()
      expect(state.paragraphs[0].hintTags).to.have.length(2)
			expect(state.paragraphs[0].hintTags).to.contain('ZOMBIE NOUNZ')
			expect(state.paragraphs[0].hintTags).to.contain('ZOMBIE NOUNS')
		})
	})

	describe('HARD_DELETE_HINT action', () => {
		it('deletes tag from a paragraph', () => {
			let state = paragraphStore.getState()
			let originalHintsLength = state.hints.length

			// integration test
			let tags = ['hint to delete', 'hint to keep']
			paragraphStore.dispatch(saveHintTags(0, tags))
			paragraphStore.dispatch(addHints(tags))
			paragraphStore.dispatch(hardDeleteHint('hint to delete'))

			state = paragraphStore.getState()
			// console.log(state)
			let newHintsLength = state.hints.length
			expect(newHintsLength).to.equal(originalHintsLength + 1)

			// console.log(state.paragraphs[0].hintTags)
			expect(state.paragraphs[0].hintTags).to.have.length(1)
			expect(state.paragraphs[0].hintTags).to.contain('hint to keep')
		})

		it('deletes a tag across several paragraphs', () => {
		})
	})

	describe('SAVE_HINT_TEXT action', () => {
    it('updates relevant hintTags', () => {
      let state = paragraphStore.getState()
			let length = state.paragraphs.length

			paragraphStore.dispatch(saveHintTags(0, ['original text']))
			paragraphStore.dispatch(addHints(['original text']))

			paragraphStore.dispatch(saveHintText('original text', 'changed text', 0))

			state = paragraphStore.getState()
			expect(state.hints).to.have.length(1) // sanity check

			expect(state.paragraphs[0].hintTags[0]).to.equal('changed text')
    })
	})
})
